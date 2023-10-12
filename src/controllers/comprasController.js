const conexion = require("../database/db");
// Moment JS
const moment = require("moment");

// Funcion para Guardar el dato en la BD:
exports.guardar = async (req, res) => {
  try {
    // Obtenemos el dato del Formulario del Navegador:
    const {
      nombre,
      categoria_id,
      proveedor_id,
      precio_unitario,
      total,
      stock,
      fecha_vencimiento,
    } = req.body;

    await conexion.query("BEGIN"); // ==> Iniciar transacción
    // Guardamos Producto en la BD:
    const producto = await conexion.query(
      "INSERT INTO productos (categoria_id, nombre) VALUES  (?, ?)",
      [categoria_id, nombre]
    );
    // Guardamos el Usuario y el Proveedor en la BD Compras:
    const compras = await conexion.query(
      "INSERT INTO compras (usuario_id, proveedor_id, precio_unitario,total) " +
        "VALUES  (?, ?, ?, ?)",
      [req.user.usuario_id, proveedor_id, precio_unitario, total]
    );
    if (producto && compras) {
      await conexion.query(
        "INSERT INTO detalle_compras (compra_id, producto_id, " +
          "stock, fecha_vencimiento) VALUES (?,?,?,?)",
        [compras.insertId, producto.insertId, stock, fecha_vencimiento]
      );
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
    const { id, idProd, idComp } = req.params;
    // Obtenemos el dato del Formuario:
    const {
      nombre,
      categoria_id,
      proveedor_id,
      precio_unitario,
      total,
      stock,
      fecha_vencimiento,
    } = req.body;
    // Formateamos la Fecha para Guardar en la BD:
    const fechaVencimiento = moment(fecha_vencimiento, "YYYY-MM-DD").format(
      "YYYY-MM-DD"
    );

    await conexion.query("BEGIN"); // ==> Iniciar transacción
    // Actualiza el datos en la BD Productos:
    await conexion.query(
      "UPDATE productos SET nombre = ?, categoria_id = ? WHERE id = ?",
      [nombre, categoria_id, idProd]
    );
    // Actualiza el datos en la BD Compras:
    await conexion.query(
      "UPDATE compras SET usuario_id = ?, proveedor_id = ?, precio_unitario = ?,total = ? WHERE id = ?",
      [req.user.usuario_id, proveedor_id, precio_unitario, total, idComp]
    );
    // Actualiza el datos en la BD Detalle_Compras:
    await conexion.query(
      "UPDATE detalle_compras SET compra_id = ?, producto_id = ?, stock = ?, fecha_vencimiento = ? WHERE id = ?",
      [idComp, idProd, stock, fechaVencimiento, id]
    );
    await conexion.query("COMMIT"); //==> Confirmar transacción
  } catch (error) {
    console.log(error);
  }
};

// Funcion para Eliminar el Proveedores (Eliminado Lógico) :
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await conexion.query(
      "UPDATE detalle_compras SET estado = 0 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/compras/listar");
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
      "UPDATE detalle_compras SET estado = 1 WHERE id = ?",
      [id]
    );
    if (result) {
      res.redirect("/compras/listar");
    } else {
      console.log("Error al Eliminar el Usuario");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.agregarPrecio = async (req, res) => {
  try {
    const { id } = req.params;
    const { precio_venta } = req.body;
    console.log(id);
    console.log(precio_venta);
    const result = await conexion.query(
      "UPDATE productos SET precio_venta = ? WHERE id = ?",
      [precio_venta, id]
    );
  } catch (error) {
    console.log(error);
  }
};
