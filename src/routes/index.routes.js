const express = require("express");

const authController = require("../controllers/authController");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/principal", authController.isAuthenticated, (req, res) => {
  res.render("home/principal", {
    title: "Inicio",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.get("/registrar", (req, res) => {
  res.render("usuario/registrar");
});

// Creamos Nuestras Rutas para el metodo del controlador:
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Exportamos las rutas:
module.exports = router;
