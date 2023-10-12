const mysql = require("mysql");
const { promisify } = require("util");

// Realizamos la conexion con la BD MySQL:
const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conexion.connect((err) => {
  if (err) {
    console.log("El error de conexion es: " + err);
    return;
  }
  console.log("Conexion exitosa a la BD.");
});

conexion.query = promisify(conexion.query);

module.exports = conexion;
