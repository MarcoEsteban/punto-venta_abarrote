const conexion = require("../database/db");

exports.listarMenus = async () => {
  const menus = await conexion.query("SELECT * FROM menus");
  return menus;
};

exports.listarRoles = async () => {
  const menus = await conexion.query("SELECT * FROM roles");
  return menus;
};

exports.listarMenusRol = async (rol_id) => {
  const menusRol = await conexion.query(
    "SELECT * FROM roles_menus rm " +
      "INNER JOIN roles r ON rm.rol_id = r.id " +
      "INNER JOIN menus m ON rm.menu_id = m.id " +
      "WHERE rm.rol_id = ?",
    [rol_id]
  );
  return menusRol;
};

exports.insertarRol = async (nombre) => {
  const rol = await conexion.query("INSERT INTO roles (nombre) VALUES (?)", [
    nombre,
  ]);
  return rol;
};

exports.insertarRolesMenus = async (rol_id, menu_id) => {
  // const resultRol = await conexion.query("INSERT INTO roles SET ?", [rol]);
  await conexion.query(
    "INSERT INTO roles_menus (rol_id, menu_id) VALUES (?, ?)",
    [rol_id, menu_id]
  );
};

exports.eliminarRol = async (id) => {
  const rol = await conexion.query("UPDATE roles SET estado = 0 WHERE id = ?", [
    id,
  ]);
  return rol;
};

exports.habilitarRol = async (id) => {
  const rol = await conexion.query("UPDATE roles SET estado = 1 WHERE id = ?", [
    id,
  ]);
  return rol;
};
