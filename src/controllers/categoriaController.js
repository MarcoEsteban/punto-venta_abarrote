const conexion = require("../database/db");

// Funcion para Guardar el dato en la BD:
exports.guardar = async (req, res) => {
  try {
    // Obtenemos el dato del Formulario del Navegador:
    const { nombre } = req.body;

    // Guardamos nombre en la BD Categoria:
    const resRol = await conexion.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre]
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
    const { nombre } = req.body;

    // Actualiza el nombre de la Categoria en la BD:
    await conexion.query("UPDATE categorias SET nombre = ? WHERE id = ?", [
      nombre,
      id,
    ]);
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Eliminar el Categoria (Eliminado Lógico) :
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE categorias SET estado = 0 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/categorias/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Habilitar el Categoria (Que tiene Eliminado Lógico) :
exports.habilitar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE categorias SET estado = 1 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/categorias/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};
