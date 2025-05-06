const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'appdb',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
});

// Middleware
app.use(cors());
app.use(express.json());

// Verificación de token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Rutas de autenticación
app.post('/api/auth/registro', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el correo ya existe
    const userCheck = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    
    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insertar nuevo cliente
    const newUser = await pool.query(
      'INSERT INTO clientes (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
      [nombre, email, hashedPassword]
    );
    
    // Generar token JWT
    const token = jwt.sign({ id: newUser.rows[0].id, email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const userResult = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const user = userResult.rows[0];
    
    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Rutas para clientes (protegidas)
app.get('/api/clientes', verifyToken, async (req, res) => {
  try {
    const clientesResult = await pool.query('SELECT id, nombre, email, fecha_registro FROM clientes');
    res.json(clientesResult.rows);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Rutas para productos
app.get('/api/productos', verifyToken, async (req, res) => {
  try {
    const query = req.query.buscar 
      ? `SELECT * FROM productos WHERE nombre ILIKE $1 OR descripcion ILIKE $1`
      : 'SELECT * FROM productos';
    
    const params = req.query.buscar ? [`%${req.query.buscar}%`] : [];
    
    const productosResult = await pool.query(query, params);
    res.json(productosResult.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://18.118.78.25t:${PORT}`);
});