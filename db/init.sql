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
('Tablet Samsung', 'Tablet Samsung Galaxy Tab A8 10.5" 64GB WiFi', 229.99, 18),
('Impresora Epson', 'Impresora multifunción Epson EcoTank L3250 WiFi', 179.90, 7),
('Disco Duro Externo', 'Disco duro externo Seagate 2TB USB 3.0', 74.99, 25),
('Memoria RAM 16GB', 'Módulo RAM DDR4 16GB 3200MHz Kingston', 62.50, 35),
('Router TP-Link', 'Router inalámbrico TP-Link Archer C6 AC1200', 39.99, 20),
('Webcam Logitech', 'Webcam Logitech C920 HD Pro 1080p', 69.99, 12),
('Silla Ergonómica', 'Silla de oficina ergonómica con soporte lumbar', 129.99, 9),
('SSD M.2 1TB', 'Unidad SSD M.2 NVMe 1TB WD Blue SN570', 99.99, 16),
('Monitor Curvo Samsung', 'Monitor curvo Samsung 27" Full HD 75Hz', 229.00, 11),
('Cargador Universal', 'Cargador universal para laptop 65W', 29.50, 40);
