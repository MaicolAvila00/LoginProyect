import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "./database.js";
import { logError } from './logger.js';

const router = express.Router();
const SECRET_KEY = "secreto123"; // Cambia esto en producción

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos." });
  }

  try {
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    logError("Error en login: " + error);

    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos." });
  }

  try {
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    logError("Error en registro: " + error);

    res.status(500).json({ message: "Error en el servidor." });
  }
});

export default router;
