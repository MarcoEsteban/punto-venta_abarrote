const conexion = require("../database/db");

exports.listarUsuarios = async () => {
  const menus = await conexion.query("SELECT * FROM menus");
  return menus;
};
