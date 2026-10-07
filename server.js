// Traigo las herramientas que necesito
import express from "express"; // Express: el framework con el que armo el servidor
import cors from "cors"; // Permite que mi frontend (en otro dominio) pueda hablar con este servidor
import authRoutes from "./authRoutes.js"; // Mis rutas de registro y login, que viven en otro archivo para mantener el orden
import path from "path"; // Herramienta de Node para trabajar con rutas de carpetas

// Solo imprime en consola en qué carpeta está corriendo el servidor (me sirve para depurar)
console.log("Ruta actual:", path.resolve());

// Creo la aplicación: este es mi servidor
const app = express();
// El puerto donde escucha. En Render lo asignan ellos con la variable PORT;
// si no existe (en mi computador), uso el 5000
const PORT = process.env.PORT || 5000;

// MIDDLEWARES: funciones que se ejecutan en cada petición antes de llegar a mis rutas
app.use(cors()); // Deja pasar las peticiones que vienen de otros orígenes (mi frontend en Vercel)
app.use(express.json()); // Convierte el JSON que llega en un objeto que puedo leer (req.body)

// Todo lo que empiece por /auth lo manejan mis rutas de authRoutes.js
// Por ejemplo: /auth/login y /auth/register, las que llamo desde React
app.use("/auth", authRoutes);

// Enciendo el servidor y le digo que se quede escuchando peticiones en ese puerto
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Aviso en consola de que arrancó bien
});