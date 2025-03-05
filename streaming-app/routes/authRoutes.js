require("dotenv").config();  // Asegúrate de importar dotenv
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");  // Asegúrate de que db esté correctamente configurado

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;  // Utiliza la variable de entorno

// Registro de usuarios
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",  // Cambié 'name' por 'username' y 'password' por 'password_hash'
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ message: "Error al registrar el usuario" });
        }
        res.status(201).json({ message: "Usuario registrado correctamente" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Inicio de sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);  // Cambié 'password' por 'password_hash'

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  });
});

module.exports = router;
