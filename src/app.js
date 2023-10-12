// Requerimos o Importamos todos los modulos que vamos a necesitar:
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

// Inicializamos express:
const app = express();

// Configuramos nuestro motor de plantilla:
app.use(expressLayouts); // Permiter poder tener una carpeta para los layouts.
app.set("views", path.join(__dirname, "views")); //Obtenemos la Ruta de la Carpeta Views
app.set("layout", path.join(app.get("views"), "layouts/main"));
app.set("view engine", "ejs");

// Configuramos nuestra carpeta Public para archivos estaticos:
app.use("/", express.static(path.join(__dirname, "public")));

// Para procesar los datos enviados desde el formulario:
app.use(express.json()); //Permite recivir Formato JSON.
app.use(express.urlencoded({ extended: false })); //Permite recivir datos de los Formularios.

// Configuramos las variables de entorno:
dotenv.config({ path: path.join(__dirname, "env/.env") });

// Utilizacion los Middlewares:
app.use(morgan("dev")); // Permite ver las peticiones enviada al servidor.
app.use(cookieParser()); // Permiter tener acceso a las cookies.

// Llamamos al Router:
app.use(require("./routes/index.routes"));
app.use("/roles", require("./routes/roles.routes"));
app.use("/usuarios", require("./routes/usuario.routes"));
app.use("/categorias", require("./routes/categoria.routes"));
app.use("/proveedor", require("./routes/proveedor.routes"));
app.use("/compras", require("./routes/compras.routes"));
app.use("/ventas", require("./routes/ventas.routes"));

// Levantamos el servidor:
app.listen(3000, () => {
  console.log("SERVER Levantado en: http://localhost:3000");
});
