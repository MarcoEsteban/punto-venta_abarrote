const express = require("express");

const conexion = require("../database/db");
const authController = require("../controllers/authController");
const categoriaController = require("../controllers/categoriaController");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/listar", authController.isAuthenticated, async (req, res) => {
  const categorias = await conexion.query("SELECT * FROM categorias");
  res.render("categoria/listar", {
    title: "Categorias",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    categorias,
  });
});

router.get("/add", authController.isAuthenticated, async (req, res) => {
  res.render("categoria/add", {
    title: "Categoria",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
  });
});

router.get("/edit/:id", authController.isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const categoria = await conexion.query(
    "SELECT * FROM categorias WHERE id = ?",
    [id]
  );
  res.render("categoria/edit", {
    title: "Categoria",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    categoria,
  });
});

/*********** Creamos Nuestras Rutas para el metodo del controlador: ***********/
router.post(
  "/guardar",
  authController.isAuthenticated,
  categoriaController.guardar
);
router.post(
  "/editar/:id",
  authController.isAuthenticated,
  categoriaController.modificar
);

router.get(
  "/eliminar/:id",
  authController.isAuthenticated,
  categoriaController.eliminar
);

router.get(
  "/habilitar/:id",
  authController.isAuthenticated,
  categoriaController.habilitar
);

// Exportamos las rutas:
module.exports = router;
