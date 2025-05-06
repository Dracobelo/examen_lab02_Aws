-- Tabla Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Laptop HP', 'Laptop HP Core i5 8GB RAM 256GB SSD', 899.99, 10),
('Monitor LG', 'Monitor LG 24" Full HD', 199.99, 15),
('Teclado Mecánico', 'Teclado mecánico RGB con switches Cherry MX', 89.99, 20),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 45.99, 30),
('Auriculares Sony', 'Auriculares con cancelación de ruido', 149.99, 12);