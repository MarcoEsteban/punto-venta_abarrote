exports.msjAdvertencia = {
  ruta: "http://localhost:3000/",
  layout: "./layouts/index",
  alert: true,
  alertTitle: "Advertencia",
  alertMessage: "Campos vacios, llenar los campos",
  alertIcon: "info",
  showConfirmButton: true,
  timer: false,
};

exports.msjEliminado = {
  // alertConfirmButton: "btn btn-success",
  // alertCancelButton: "btn btn-danger",
  // alertButtonStyling: true,
  ruta: "http://localhost:3000/",
  layout: "./layouts/index",
  alert: true,
  alertTitle: "Estas seguro",
  alertIcon: "warning",
  alertMensaje: "",
  alertShowCancelButton: true,
  alertConfirmButtonText: "Si, eliminar!",
  alertCancelButtonText: "No, cancelar!",
  alertReverseButton: true,
};

exports.msjGuardado = {
  ruta: "http://localhost:3000/",
  layout: "./layouts/index",
  alert: true,
  alertTitle: "Guardado Correctamente",
  alertMessage: "¡DATOS CORRECTO!",
  alertIcon: "success",
  showConfirmButton: false,
  timer: 900,
};

exports.msjModificado = {
  ruta: "http://localhost:3000/",
  layout: "./layouts/index",
  alert: true,
  alertTitle: "Guardado Correctamente",
  alertMessage: "¡DATOS CORRECTO!",
  alertIcon: "success",
  showConfirmButton: false,
  timer: 800,
  // ruta: "add",
  // user: req.user,
};

exports.msjAdvertenciaLogin = {
  alert: true,
  alertTitle: "Advertencia",
  alertMessage: "Ingrese un usuario y contraseña",
  alertIcon: "info",
  showConfirmButton: true,
  timer: false,
  ruta: "login",
};

exports.msjErrorLogin = {
  alert: true,
  alertTitle: "Error",
  alertMessage: "Usuario y/o Contraseña son incorrectas",
  alertIcon: "error",
  showConfirmButton: true,
  timer: false,
  ruta: "login",
};

//? alerta de advertencia de campos vacios:
// res.render("roles/add", {
//   title: "Rol",
//   ruta: "http://localhost:3000/",
//   layout: "./layouts/index",
//   user: req.user,
//   alert: true,
//   alertTitle: "Advertencia",
//   alertMessage: "Ingrese un nombre",
//   alertIcon: "info",
//   showConfirmButton: true,
//   timer: false,
//   enlace: "roles/add",
//   menus,
// });
//? Alerta de Guardado Correct:
// res.render("roles/add", {
//   title: "Rol",
//   ruta: "http://localhost:3000/",
//   layout: "./layouts/index",
//   user: req.user,
//   alert: true,
//   alertTitle: "Guardado Correctamente",
//   alertMessage: "¡DATOS CORRECTO!",
//   alertIcon: "success",
//   showConfirmButton: false,
//   timer: 800,
//   enlace: "roles/listar",
//   menus,
// });

// ruta: "http://localhost:3000/",
// layout: "./layouts/index",
// user: req.user,
// alert: true,
// alertTitle: "Guardado Correctamente",
// alertMessage: "¡DATOS CORRECTO!",
// alertIcon: "success",
// showConfirmButton: false,
// timer: 800,
// enlace: "roles/listar",

// EXPORTAMOS LAS FUNCIONES:
// module.exports = {
//   msjAdvertencia,
//   msjEliminado,
//   msjGuardado,
//   msjModificado,
//   msjAdvertenciaLogin,
//   msjErrorLogin,
// };
