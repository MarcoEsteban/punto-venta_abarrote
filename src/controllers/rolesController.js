const conexion = require("../database/db");
const alerta = require("../utils/alert.handle");
const rolDB = require("../manager/rolConsulta");

// Funcion para Guardar el dato en la BD:
exports.guardar = async (req, res) => {
  try {
    // Obtenemos el dato del Formulario del Navegador:
    const { nombre, menusrol } = req.body;

    await conexion.query("BEGIN"); // ==> Iniciar transacción
    // Guardamos nombre en la BD Roles:
    const resRol = await rolDB.insertarRol(nombre);
    // Verificar si el rol se insertó correctamente
    if (resRol) {
      // Insertar roles y menus en la base de datos
      for (const menu_id of menusrol) {
        // Guardamos menus y rol en la BD:
        await rolDB.insertarRolesMenus(resRol.insertId, menu_id);
      }
    }
    await conexion.query("COMMIT"); //==> Confirmar transacción
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Editar y Guardar el nuevo dato en la BD:
exports.modificar = async (req, res) => {
  try {
    // Obtenemos el valor de la URL:
    const { id } = req.params;
    // Obtenemos el dato del Formuario:
    const { nombre, menusrol } = req.body;

    await conexion.query("BEGIN"); // Iniciar transacción
    // Actualiza el nombre del rol en la base de datos
    await conexion.query("UPDATE roles SET nombre = ? WHERE id = ?", [
      nombre,
      id,
    ]);
    // Elimina todos los menús asociados a este rol en roles_menus
    await conexion.query("DELETE FROM roles_menus WHERE rol_id = ?", [id]);
    // Inserta los nuevos menús asociados a este rol en roles_menus
    for (const menu_id of menusrol) {
      await conexion.query(
        "INSERT INTO roles_menus (rol_id, menu_id) VALUES (?, ?)",
        [id, menu_id]
      );
    }
    await conexion.query("COMMIT"); // Confirmar transacción
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Eliminar el Rol (Eliminado Lógico) :
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await conexion.query(
      "UPDATE roles SET estado = 0 WHERE id = ?",
      [id]
    );
    if (rol) {
      res.redirect("/roles/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Habilitar el Rol (Que tiene Eliminado Lógico) :
exports.habilitar = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await conexion.query(
      "UPDATE roles SET estado = 1 WHERE id = ?",
      [id]
    );
    if (rol) {
      res.redirect("/roles/listar");
    } else {
      console.log("Error al Habilitar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};
