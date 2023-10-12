const conexion = require("../database/db");
const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/usuarioController");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/listar", authController.isAuthenticated, async (req, res) => {
  const usuarios = await conexion.query(
    "SELECT ur.*, u.nombre, u.user, u.estado, r.nombre AS nombreRol " +
      "FROM usuario_roles ur " +
      "INNER JOIN usuarios u ON ur.usuario_id = u.id " +
      "INNER JOIN roles r ON ur.rol_id = r.id "
    // "WHERE u.estado = 1 AND r.estado = 1 "
  );
  res.render("usuario/listar", {
    title: "Usuarios",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    usuarios,
  });
});

router.get("/add", authController.isAuthenticated, async (req, res) => {
  const roles = await conexion.query("SELECT * FROM roles WHERE estado = 1");
  res.render("usuario/add", {
    title: "Usuario",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    roles,
  });
});

router.get("/edit/:id", authController.isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const roles = await conexion.query("SELECT * FROM roles WHERE estado = 1");
  const userRol = await conexion.query(
    "SELECT ur.*, u.*, r.nombre AS nombreRol " +
      "FROM usuario_roles ur " +
      "INNER JOIN usuarios u ON ur.usuario_id = u.id " +
      "INNER JOIN roles r ON ur.rol_id = r.id " +
      "WHERE ur.usuario_id = ?",
    [id]
  );
  res.render("usuario/edit", {
    title: "Usuario",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    roles,
    userRol,
  });
});

/*********** Creamos Nuestras Rutas para el metodo del controlador: ***********/
router.post("/guardar", authController.isAuthenticated, userController.guardar);
router.post(
  "/editar/:id",
  authController.isAuthenticated,
  userController.modificar
);
router.get(
  "/eliminar/:id",
  authController.isAuthenticated,
  userController.eliminar
);
router.get(
  "/habilitar/:id",
  authController.isAuthenticated,
  userController.habilitar
);

// Exportamos las rutas:
module.exports = router;
