const bcrypt = require("../utils/bcrypt.handle");
const conexion = require("../database/db");

// Funcion para Guardar el dato en la BD:
exports.guardar = async (req, res) => {
  try {
    //Obtenemos el dato del Formulario.
    const { nombre, apellido, user, password, idRol } = req.body;
    // Encryptamos la contraseña:
    let passHash = await bcrypt.hashPassword(password);
    // Obtenemos los roles de la BD:
    const roles = await conexion.query("SELECT * FROM roles WHERE estado = 1");
    console.log(roles);

    await conexion.query("BEGIN"); // ==> Iniciar transacción
    // Guardamos usuario en la BD:
    const resUser = await conexion.query(
      "INSERT INTO usuarios (nombre, apellido, user, password) VALUES (?, ?, ?, ?)",
      [nombre, apellido, user, passHash]
    );
    // Guardamos el Rol del Usuario en la BD:
    await conexion.query(
      "INSERT INTO usuario_roles (usuario_id,rol_id) VALUES (?, ?)",
      [resUser.insertId, idRol]
    );
    await conexion.query("COMMIT"); //==> Confirmar transacción
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Editar y Guardar el nuevo dato en la BD:
exports.modificar = async (req, res) => {
  try {
    // Obtenemos el parametro enviado por la URL:
    const { id } = req.params;
    //Obtenemos el dato del Formulario.
    const { nombre, apellido, user, password, idRol } = req.body;
    // Encryptamos la contraseña:
    let passHash = await bcrypt.hashPassword(password);

    await conexion.query("BEGIN"); // Iniciar transacción
    // Actualiza los datos de la tabla usuarios en la DB:
    await conexion.query(
      "UPDATE usuarios SET nombre = ?, apellido = ?, user = ?, password = ? " +
        " WHERE id = ?",
      [nombre, apellido, user, passHash, id]
    );
    // Elimina el rol asociado a este rol en roles_menus
    await conexion.query("DELETE FROM usuario_roles WHERE usuario_id = ?", [
      id,
    ]);
    // Inserta los nuevos menús asociados a este rol en roles_menus
    await conexion.query(
      "INSERT INTO usuario_roles (usuario_id, rol_id) VALUES (?, ?)",
      [id, idRol]
    );
    await conexion.query("COMMIT"); // Confirmar transacción
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Eliminar el Usuario (Eliminado Lógico) :
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE usuarios SET estado = 0 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/usuarios/listar");
    } else {
      console.log("Error al Habilitar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Habilitar el Rol (Que tiene Eliminado Lógico) :
exports.habilitar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE usuarios SET estado = 1 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/usuarios/listar");
    } else {
      console.log("Error al Habilitar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};
