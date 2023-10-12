const express = require("express");
// Importar Moment.js
const moment = require("moment");
// require("moment/locale/es"); // Importar el idioma español

const conexion = require("../database/db");
const authController = require("../controllers/authController");
const comprasController = require("../controllers/comprasController");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/listar", authController.isAuthenticated, async (req, res) => {
  res.render("ventas/listar", {
    title: "Productos",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    // productos,
  });
});

router.get("/add", authController.isAuthenticated, async (req, res) => {
  const categorias = await conexion.query(
    "SELECT * FROM categorias WHERE estado = 1"
  );
  const proveedores = await conexion.query(
    "SELECT * FROM proveedores WHERE estado = 1"
  );
  res.render("compras/add", {
    title: "Producto",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    categorias,
    proveedores,
  });
});

router.get("/edit/:id", authController.isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const categorias = await conexion.query(
    "SELECT * FROM categorias WHERE estado = 1"
  );
  const proveedores = await conexion.query(
    "SELECT * FROM proveedores WHERE estado = 1"
  );
  const productos = await conexion.query(
    "SELECT dc.*, pd.nombre, pd.precio_venta, pd.categoria_id, " +
      "co.proveedor_id, co.usuario_id, co.total, co.precio_unitario, " +
      "ca.nombre AS nombreCategoria, pv.nombre AS nombreProveedor " +
      "FROM detalle_compras dc " +
      "INNER JOIN productos pd ON dc.producto_id = pd.id " +
      "INNER JOIN compras co ON dc.compra_id = co.id " +
      "INNER JOIN categorias ca ON pd.categoria_id = ca.id " +
      "INNER JOIN proveedores pv ON co.proveedor_id = pv.id " +
      "WHERE dc.id = ?",
    [id]
  );
  res.render("compras/edit", {
    title: "Producto",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    productos,
    categorias,
    proveedores,
  });
});

router.get(
  "/editPrecio/:idProd/:idCom",
  authController.isAuthenticated,
  async (req, res) => {
    const { idProd, idCom } = req.params;
    const compra = await conexion.query(
      "SELECT co.precio_unitario, pd.precio_venta, dc.producto_id " +
        "FROM detalle_compras dc " +
        "INNER JOIN productos pd ON dc.producto_id = pd.id " +
        "INNER JOIN compras co ON dc.compra_id = co.id " +
        "WHERE dc.producto_id = ? AND dc.compra_id",
      [idProd, idCom]
    );
    // console.log(compra);
    res.render("compras/addPrecio", {
      title: "Precio",
      ruta: "http://localhost:3000/",
      layout: "./layouts/index",
      user: req.user,
      compra,
    });
  }
);

/*********** Creamos Nuestras Rutas para el metodo del controlador: ***********/
router.post(
  "/guardar",
  authController.isAuthenticated,
  comprasController.guardar
);
router.post(
  "/editar/:id",
  authController.isAuthenticated,
  comprasController.modificar
);

router.get(
  "/eliminar/:id",
  authController.isAuthenticated,
  comprasController.eliminar
);

router.get(
  "/habilitar/:id",
  authController.isAuthenticated,
  comprasController.habilitar
);

router.post(
  "/addPrecio/:id",
  authController.isAuthenticated,
  comprasController.agregarPrecio
);

// Exportamos las rutas:
module.exports = router;
