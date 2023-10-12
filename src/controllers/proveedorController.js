const conexion = require("../database/db");

// Funcion para Guardar el dato en la BD:
exports.guardar = async (req, res) => {
  try {
    // Obtenemos el dato del Formulario del Navegador:
    const { nombre, celular, direccion, correo } = req.body;

    // Guardamos datos en la BD Proveedores:
    await conexion.query(
      "INSERT INTO proveedores (nombre, celular, direccion, correo) VALUES (?, ?, ?, ?)",
      [nombre, celular, direccion, correo]
    );
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
    const { nombre, celular, direccion, correo } = req.body;

    // Actualiza el datos en la BD Proveedores:
    await conexion.query(
      "UPDATE proveedores SET nombre = ?, celular = ?, direccion = ?, correo = ? WHERE id = ?",
      [nombre, celular, direccion, correo, id]
    );
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Eliminar el Proveedores (Eliminado Lógico) :
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE proveedores SET estado = 0 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/proveedor/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Habilitar el Proveedores (Que tiene Eliminado Lógico) :
exports.habilitar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE proveedores SET estado = 1 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/proveedor/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};
