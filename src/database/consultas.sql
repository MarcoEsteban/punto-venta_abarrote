CREATE TABLE menus (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    enlace VARCHAR(255),
    icon VARCHAR(255)
);

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    estado INT DEFAULT 1
);

CREATE TABLE roles_menus (
    rol_id INT,
    menu_id INT,
    PRIMARY KEY (menu_id, rol_id),
    FOREIGN KEY (menu_id) REFERENCES menus(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    foto VARCHAR(255),
    user VARCHAR(255),
    password VARCHAR(255),
    estado INT DEFAULT 1
);

CREATE TABLE usuario_roles (
    usuario_id INT,
    rol_id INT,
    PRIMARY KEY (usuario_id, rol_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    estado INT DEFAULT 1
);

CREATE TABLE proveedores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    celular VARCHAR(15),
    direccion VARCHAR(255),
    correo VARCHAR(255),
    estado INT DEFAULT 1,
);

CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria_id INT,
    nombre VARCHAR(255),
    precio_venta DECIMAL(10, 2) DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    estado INT DEFAULT 1,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE compras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    proveedor_id INT,
    precio_unitario DECIMAL(10, 2),
    total DECIMAL(10, 2),
    estado INT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE detalle_compras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    compra_id INT,
    producto_id INT,
    stock INT,
    fecha DATE,
    estado INT DEFAULT 1,
    FOREIGN KEY (compra_id) REFERENCES compras(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dni INT,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
);

CREATE TABLE ventas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    cliente_id INT,
    fecha DATE,
    total DECIMAL(10, 2),
    estado INT DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
);

CREATE TABLE detalle_ventas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venta_id INT,
    producto_id INT,
    cantidad INT,
    sub_total DECIMAL(10, 2),
    estado INT DEFAULT 1,
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Lista Datos Especificos de Compras - Productos - Detalle_Compra - Proveedor - Categoria:
SELECT dc.*, pd.nombre, pd.precio_venta, pd.categoria_id, 
co.proveedor_id, co.usuario_id, co.total, co.precio_unitario,
ca.nombre AS nombreCategoria, pv.nombre AS nombreProveedor
FROM detalle_compras dc
INNER JOIN productos pd ON dc.producto_id = pd.id
INNER JOIN compras co ON dc.compra_id = co.id
INNER JOIN categorias ca ON pd.categoria_id = ca.id
INNER JOIN proveedores pv ON co.proveedor_id = pv.id;

-- Lista las Compras - Productos - DetalleCompra - Proveedor - Categoria:
SELECT * from detalle_compras dc
INNER JOIN productos pd ON dc.producto_id = pd.id
INNER JOIN compras co ON dc.compras_id = co.id
INNER JOIN categorias ca ON pd.categoria_id = ca.id
INNER JOIN proveedores pv ON co.proveedor_id = pv.id;

-- Listas los Menus de cada Rol:
SELECT rm.menu_id, m.nombre 
FROM roles_menus rm 
INNER JOIN roles r ON rm.rol_id = r.id 
INNER JOIN menus m ON rm.menu_id = m.id 
WHERE rm.rol_id = 1;

-- Listas el Rol de cada Usuario:
SELECT ur.*, u.nombre, r.nombre AS nombreRol FROM usuario_roles ur
INNER JOIN usuarios u ON ur.usuario_id = u.id 
INNER JOIN roles r ON ur.rol_id = r.id 
WHERE ur.usuario_id = 1

-- Insertar los Menus que Tendra el Sistema: 
INSERT INTO menus (nombre, enlace, icon) VALUES ('Roles', 'roles', 'fas fa-solid fa-users');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Usuarios', 'usuarios', 'fas fa-solid fa-user-secret');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Proveedor', 'proveedor', 'fa-solid fa-truck-fast');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Categorias', 'categorias', 'fa-solid fa-tags');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Compras', 'compras', 'fa-solid fa-cart-shopping');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Ventas', 'ventas', 'fa-solid fa-cash-register');
INSERT INTO menus (nombre, enlace, icon) VALUES ('Ventas Realizadas', 'ventas', 'fa-solid fa-sack-dollar');

-- Insertar un Rol:
INSERT INTO roles (nombre) VALUES ('ADMINISTRADOR');

-- Insertar los Menus y Rol: (Asigno al Administrador todos los Roles);
INSERT INTO roles_menus VALUES (1, 1);
INSERT INTO roles_menus VALUES (1, 2);
INSERT INTO roles_menus VALUES (1, 3);
INSERT INTO roles_menus VALUES (1, 4);
INSERT INTO roles_menus VALUES (1, 5);
INSERT INTO roles_menus VALUES (1, 6);
INSERT INTO roles_menus VALUES (1, 7);

-- Insertar el Usuario y Rol: (Asigno un Usuario que sera el Administrador);
INSERT INTO usuario_roles VALUES (1, 1);


INSERT INTO productos (categoria_id, nombre, precio_venta) VALUES (1, "Soda Coca Cola");
INSERT INTO compras (usuario_id, proveedor_id, total) VALUES (1, 1, 150);
INSERT INTO detalle_compras (compra_id, producto_id, stock, stock, fecha_vencimiento) VALUES (1, 1, 15, '2023-10-3');

Formulario:
Nombre Producto:
Seleccionar Categoria:
Seleccionar Proveedor:
Total:
Precio Unitario:

Stock:
Fecha Vencimiento:

Precio Venta:
