import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url );
const dirname = path.dirname(__filename);

const logFilePath = path.join(dirname, 'logs', 'app.log');

const logError = (message) => {
  const logMessage = `${new Date().toISOString()} - ERROR: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

const logInfo = (message) => {
  const logMessage = `${new Date().toISOString()} - INFO: ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
};

export { logError, logInfo };
