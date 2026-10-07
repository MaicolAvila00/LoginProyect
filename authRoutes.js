// Traigo lo que necesito
import express from "express"; // El framework del servidor
import bcrypt from "bcrypt"; // Para encriptar contraseñas y compararlas después
import jwt from "jsonwebtoken"; // Para crear el token que identifica al usuario
import db from "./database.js"; // Mi conexión a la base de datos (SQLite)
import { logError } from './logger.js'; // Mi función para anotar errores en el archivo de logs

// El router es como un "mini servidor" donde agrupo las rutas de autenticación
const router = express.Router();
// La clave con la que firmo los tokens. Solo el servidor debe conocerla
const SECRET_KEY = "secreto123"; // Cambia esto en producción

// ===== LOGIN: cuando alguien quiere entrar =====
router.post("/login", async (req, res) => {
  // Saco el email y la contraseña que me mandó el frontend
  const { email, password } = req.body;

  // Si falta alguno, respondo 400 (petición mal hecha) y me detengo
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos." });
  }

  try {
    // Busco en la base de datos a alguien con ese email.
    // Uso el "?" y le paso el email aparte: así evito la inyección SQL
    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    // Si no existe, respondo 401 (no autorizado)
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    // Comparo la contraseña escrita con la encriptada que guardé.
    // Nunca se desencripta: bcrypt encripta la que llega y mira si coinciden
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Si todo está bien, creo el token: lleva el email adentro, está firmado con mi clave
    // y se vence en 1 hora
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token }); // Se lo mando al frontend, que lo guarda en localStorage
  } catch (error) {
    // Si algo inesperado falla (por ejemplo, la base de datos), lo anoto en el log
    logError("Error en login: " + error);

    // Y al usuario solo le digo algo general, sin mostrar detalles internos
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// ===== REGISTRO: cuando alguien crea su cuenta =====
router.post("/register", async (req, res) => {
  // Saco el email y la contraseña del cuerpo de la petición
  const { email, password } = req.body;

  // Mismo chequeo: sin datos completos no sigo
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos." });
  }

  try {
    // Reviso si ese correo ya está registrado, para no duplicar cuentas
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe." });
    }

    // Encripto la contraseña antes de guardarla. El 10 es qué tan "costoso" es el cálculo:
    // más alto = más seguro pero más lento
    const hashedPassword = await bcrypt.hash(password, 10);
    // Guardo el usuario con la contraseña ya encriptada, nunca la original
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);

    // 201 significa "creado con éxito"
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    logError("Error en registro: " + error);

    res.status(500).json({ message: "Error en el servidor." });
  }
});

// Lo dejo disponible para que index.js lo conecte bajo la ruta /auth
export default router;