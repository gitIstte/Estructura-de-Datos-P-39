require("dotenv").config();  // Asegúrate de cargar las variables de entorno
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,  // Utiliza las variables de entorno
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,  // Limite de conexiones simultáneas
});

// Verifica la conexión al pool de base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
  connection.release();  // Libera la conexión después de verificar
});

module.exports = pool;
