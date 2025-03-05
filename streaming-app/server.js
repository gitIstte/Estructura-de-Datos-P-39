require("dotenv").config();  // Asegúrate de importar dotenv

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
const corsOptions = {
  origin: "http://localhost:3000",  // Permite solo las solicitudes de este origen
  methods: "GET,POST,PUT,DELETE",  // Los métodos HTTP permitidos
  allowedHeaders: "Content-Type, Authorization",  // Los encabezados permitidos
};

app.use(cors(corsOptions));  // Aplica la configuración de CORS

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
