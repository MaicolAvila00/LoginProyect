# LoginProyect

Aplicación full stack de registro e inicio de sesión, construida con **React** en el frontend y una **API REST propia** en **Node.js + Express**, con persistencia de datos en **SQLite**.

## 🔗 Demo en vivo

- **Frontend (app):** [https://loggin-usuarios.vercel.app/login](https://loggin-usuarios.vercel.app/login)
- **Backend (API):** [https://loginproyect-j680.onrender.com](https://loginproyect-j680.onrender.com)

> ⚠️ El backend está desplegado en el plan gratuito de Render, así que la primera petición puede tardar unos segundos en responder si el servidor estaba "dormido". Además, al tratarse de un plan gratuito sin disco persistente, los datos de la base SQLite pueden reiniciarse en cada nuevo despliegue — esto es solo una demo técnica, no un entorno de producción.

## 🛠️ Tecnologías

**Frontend**
- React
- Vite
- React Router
- Axios

**Backend**
- Node.js
- Express
- SQLite (better-sqlite3 / sqlite3)
- CORS

**Despliegue**
- Frontend → Vercel
- Backend → Render

## ✨ Funcionalidades

- Registro de nuevos usuarios con validación de campos
- Inicio de sesión con autenticación
- Manejo de sesión mediante token guardado en el cliente
- Mensajes de error y éxito en tiempo real en los formularios
- Vista de Dashboard protegida tras iniciar sesión

## 📁 Estructura del proyecto

```
LoginProyect/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── Styles/
│   ├── App.jsx
│   └── main.jsx
├── server.js        # Servidor Express (API)
├── authRoutes.js     # Rutas de autenticación
├── database.js       # Conexión y configuración de SQLite
├── logger.js          # Registro de logs del servidor
└── vite.config.js
```

## 🚀 Cómo correrlo en local

Este repositorio contiene el frontend y el backend juntos. Necesitas dos terminales abiertas al mismo tiempo.

### 1. Clona el repositorio

```bash
git clone https://github.com/MaicolAvila00/LoginProyect.git
cd LoginProyect
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea tu archivo `.env` en la raíz

```
VITE_API_URL=http://localhost:5000
```

### 4. Inicia el backend (terminal 1)

```bash
node server.js
```

### 5. Inicia el frontend (terminal 2)

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173` (o el puerto que indique Vite), conectada a la API local en `http://localhost:5000`.

## 🌐 Variables de entorno en producción

| Variable | Dónde se configura | Valor |
|---|---|---|
| `VITE_API_URL` | Vercel (Environment Variables) | URL pública del backend en Render |
| `PORT` | Render (la asigna automáticamente) | — |

## 👤 Autor

**Maicol Ávila**
Estudiante de Ingeniería de Sistemas — Universidad La CUN

- GitHub: [github.com/MaicolAvila00](https://github.com/MaicolAvila00)
- LinkedIn: [linkedin.com/in/maicol-avila-032503210](https://linkedin.com/in/maicol-avila-032503210)
- Portafolio: [portofoliov1-maicol-avilas-projects.vercel.app](https://portofoliov1-maicol-avilas-projects.vercel.app)
