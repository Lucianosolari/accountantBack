const { Pool } = require("pg");

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost", // La dirección del servidor de PostgreSQL
  database: "accountdm",
  password: "Guille1333%",
  port: 5432, // El puerto predeterminado de PostgreSQL
});

module.exports = pool;
