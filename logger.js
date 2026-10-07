// Traigo las herramientas de Node que necesito
import fs from 'fs'; // "File System": sirve para leer y escribir archivos
import path from 'path'; // Ayuda a armar rutas de carpetas sin errores
import { fileURLToPath } from 'url'; // Convierte la dirección de este archivo en una ruta normal

// En módulos ES (import/export) no existe __filename por defecto, así que lo calculo yo:
// aquí guardo la ruta completa de este archivo
const __filename = fileURLToPath(import.meta.url );
// Y de ahí saco la carpeta donde vive este archivo
const dirname = path.dirname(__filename);

// Armo la ruta del archivo donde voy a guardar los registros: carpeta "logs", archivo "app.log"
const logFilePath = path.join(dirname, 'logs', 'app.log');

// Función para guardar un ERROR (cuando algo sale mal)
const logError = (message) => {
  // Escribo la fecha y hora exacta, la palabra ERROR y el mensaje. El \n salta a la línea siguiente
  const logMessage = `${new Date().toISOString()} - ERROR: ${message}\n`;
  // appendFileSync agrega al final del archivo, sin borrar lo anterior
  fs.appendFileSync(logFilePath, logMessage);
};

// Función para guardar INFO (cosas normales que quiero dejar anotadas, como "usuario registrado")
const logInfo = (message) => {
  const logMessage = `${new Date().toISOString()} - INFO: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

// Las dejo disponibles para usarlas desde otros archivos, como authRoutes.js
export { logError, logInfo };