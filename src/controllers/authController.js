const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

//procedimiento para registrarnos
exports.register = async (req, res) => {
  try {
    // Obtenemos los datos del Formulario:
    const { nombre, apellido, user, password } = req.body;
    console.log(req.body);
    // Encryptamos la contraseña:
    let passHash = await bcryptjs.hash(password, 8);
    // Guardamos los datos en la DB:
    conexion.query(
      "INSERT INTO usuarios SET ?",
      { nombre, user, password: passHash, apellido },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Procedimiento para el Ingreso al Sistema:
exports.login = async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log(user, password);

    // Verificamos si la contraseña y usuaro sean correctos:
    if (!user || !password) {
      res.render("auth/login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      // Comprovamos que el usuario exista en la BD:
      conexion.query(
        "SELECT * FROM usuarios WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(password, results[0].password))
          ) {
            res.render("auth/login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o Contrsaseña son incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            //Inicio de sesión OK
            const id = results[0].id;
            const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            //generamos el token SIN fecha de expiracion
            //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
            console.log("TOKEN: " + token + " para el USUARIO : " + user);

            // Configuramos la Cookie para el inicio de Sesion:
            const cookiesOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("jwt", token, cookiesOptions);
            res.render("auth/login", {
              alert: true,
              alertTitle: "Conexión exitosa",
              alertMessage: "¡LOGIN CORRECTO!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: "principal",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// Procedimiento o Middlewars para comprobar si el usuario esta autenticado:
exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );
      const usuario = await conexion.query(
        "SELECT ur.*, u.nombre, u.apellido, u.user, r.nombre AS nombreRol " +
          "FROM usuario_roles ur " +
          "INNER JOIN usuarios u ON ur.usuario_id = u.id " +
          "INNER JOIN roles r ON ur.rol_id = r.id " +
          "WHERE ur.usuario_id = ?",
        [decodificada.id]
      );
      const menus = await conexion.query(
        "SELECT m.* FROM roles_menus rm " +
          "INNER JOIN roles r ON rm.rol_id = r.id " +
          "INNER JOIN menus m ON rm.menu_id = m.id " +
          "WHERE rm.rol_id = ?",
        [usuario[0].rol_id]
      );
      const user = { ...usuario[0], menus: menus };
      if (!usuario) {
        return next();
      }
      req.user = user;
      // console.log(req.user);
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("login");
  }
};

// Funcion para Cerrar sesion:
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("login");
};
