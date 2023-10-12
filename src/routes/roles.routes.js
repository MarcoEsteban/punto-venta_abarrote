const conexion = require("../database/db");
const express = require("express");

const authController = require("../controllers/authController");
const rolesController = require("../controllers/rolesController");
const { listarMenus, listarRoles } = require("../manager/rolConsulta");

// Obtenemos las rutas de express:
const router = express.Router();

/****************** Creamos Nuestras Rutas para las vistas: *******************/
router.get("/listar", authController.isAuthenticated, async (req, res) => {
  const menus = await listarMenus();
  const roles = await listarRoles();
  if (roles.length > 0) {
    let data = [];
    //SECTION --> Recorremos cada uno de los roles para get todos sus menus:
    for (const rol of roles) {
      const resMenus = await conexion.query(
        "SELECT * FROM roles_menus rm " +
          "INNER JOIN roles r ON rm.rol_id = r.id " +
          "INNER JOIN menus m ON rm.menu_id = m.id " +
          "WHERE rm.rol_id = ?",
        [rol.id]
      );
      // Transforma los resultados de resMenus para eliminar los objetos RowDataPacket
      const menus = resMenus.map((menu) => {
        return {
          id: menu.id,
          nombre: menu.nombre,
        };
      });

      // Asigna los datos transformados a la propiedad menus del objeto rol
      const menusRoles = { ...rol, menus: menus };
      data.push(menusRoles);
    }
    // console.log(data);
    res.render("roles/listar", {
      title: "Roles",
      ruta: "http://localhost:3000/",
      layout: "./layouts/index",
      user: req.user,
      menus,
      roles: data,
    });
  }
});

router.get("/add", authController.isAuthenticated, async (req, res) => {
  const menus = await conexion.query("SELECT * FROM menus");
  res.render("roles/add", {
    title: "Rol",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    menus,
  });
});

router.get("/edit/:id", authController.isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const menus = await conexion.query("SELECT * FROM menus");
  const roles = await conexion.query("SELECT * FROM roles WHERE id = ?", [id]);
  const menusRol = await conexion.query(
    "SELECT m.id FROM roles_menus rm " +
      "INNER JOIN roles r ON rm.rol_id = r.id " +
      "INNER JOIN menus m ON rm.menu_id = m.id " +
      "WHERE rm.rol_id = ?",
    [id]
  );
  res.render("roles/edit", {
    title: "Rol",
    ruta: "http://localhost:3000/",
    layout: "./layouts/index",
    user: req.user,
    rol: roles,
    menus,
    menusRol,
  });
});

/*********** Creamos Nuestras Rutas para el metodo del controlador: ***********/
router.post(
  "/guardar",
  authController.isAuthenticated,
  rolesController.guardar
);
router.post(
  "/editar/:id",
  authController.isAuthenticated,
  rolesController.modificar
);

router.get(
  "/eliminar/:id",
  authController.isAuthenticated,
  rolesController.eliminar
);

router.get(
  "/habilitar/:id",
  authController.isAuthenticated,
  rolesController.habilitar
);

// Exportamos las rutas:
module.exports = router;
