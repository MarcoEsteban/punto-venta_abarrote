const express = require("express");

const conexion = require("../database/db");
const authController = require("../controllers/authController");
const proveedorController = require("../controllers/proveedorController");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/listar", authController.isAuthenticated, async (req, res) => {
  const proveedores = await conexion.query("SELECT * FROM proveedores");
  res.render("proveedor/listar", {
    title: "Proveedores",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    proveedores,
  });
});

router.get("/add", authController.isAuthenticated, async (req, res) => {
  res.render("proveedor/add", {
    title: "Proveedor",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
  });
});

router.get("/edit/:id", authController.isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const proveedor = await conexion.query(
    "SELECT * FROM proveedores WHERE id = ?",
    [id]
  );
  res.render("proveedor/edit", {
    title: "Proveedor",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    proveedor,
  });
});

/*********** Creamos Nuestras Rutas para el metodo del controlador: ***********/
router.post(
  "/guardar",
  authController.isAuthenticated,
  proveedorController.guardar
);
router.post(
  "/editar/:id",
  authController.isAuthenticated,
  proveedorController.modificar
);

router.get(
  "/eliminar/:id",
  authController.isAuthenticated,
  proveedorController.eliminar
);

router.get(
  "/habilitar/:id",
  authController.isAuthenticated,
  proveedorController.habilitar
);

// Exportamos las rutas:
module.exports = router;
