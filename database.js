// Traigo las herramientas para usar la base de datos
import sqlite3 from "sqlite3"; // El motor de SQLite: una base de datos que vive en un solo archivo
import { open } from "sqlite"; // Un envoltorio que me deja usar async/await (más cómodo que callbacks)

// Abro (o creo, si no existe) la base de datos. El await de nivel superior espera a que esté lista
// antes de que el resto de la app la use
const db = await open({
  filename: "./database.sqlite", // El archivo donde se guardan todos los datos
  driver: sqlite3.Database, // Le digo qué motor usar por debajo
});

// Creo la tabla de usuarios, pero solo si todavía no existe (por eso el IF NOT EXISTS).
// Así puedo arrancar el servidor muchas veces sin borrar ni duplicar nada
await db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, -- Número único de cada usuario; sube solo (1, 2, 3...)
  email TEXT UNIQUE, -- El correo; UNIQUE hace que la base no deje repetirlo
  password TEXT -- Aquí va la contraseña ya encriptada (el hash), nunca la original
)`);

// La dejo disponible para usarla desde authRoutes.js
export default db;