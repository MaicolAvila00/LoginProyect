import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: "./database.sqlite",
  driver: sqlite3.Database,
});

await db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

export default db;
