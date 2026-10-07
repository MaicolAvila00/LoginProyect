// ===== IMPORTACIONES =====
import React, { useState } from "react"; // useState: guarda datos que cambian
import axios from "axios"; // Hace peticiones HTTP a mi API
import { useNavigate } from "react-router-dom"; // Cambia de página sin recargar
import "../Styles/Login.css"; // Usa los mismos estilos que Register
import { Link } from "react-router-dom"; // Enlace entre rutas sin recargar



// URL del backend: variable de entorno (producción) o localhost (desarrollo)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // RUTA DEL SERVIDOR

// Componente de la pantalla de login
const Login = () => {
  // ===== ESTADOS =====
  const [email, setEmail] = useState(""); // Email escrito
  const [password, setPassword] = useState(""); // Contraseña escrita
  const [message, setMessage] = useState(null); // Mensaje para el usuario
  const [isError, setIsError] = useState(false); // true = error, false = éxito
  const navigate = useNavigate(); // Para redirigir

  // ===== LÓGICA DEL LOGIN =====
  // async: la petición al servidor tarda y hay que esperarla
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    setMessage(null); // Limpia mensajes anteriores
    setIsError(false);

    // Validación en frontend: campos vacíos
    if (!email || !password) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return; // Corta aquí, no llama al servidor
    }

    try {
      // POST a /auth/login con email y contraseña en JSON
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // El servidor devuelve un token si las credenciales son válidas
      localStorage.setItem("token", response.data.token); // Guardar el token
      setMessage("Inicio de sesión exitoso!");
      setIsError(false);

      // Espera 1.5 s para ver el mensaje y va al dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      // Error del servidor (credenciales malas) o sin respuesta
      setIsError(true);
      // Usa el mensaje del backend; si no hay, uno genérico
      setMessage(
        error.response?.data?.message || "Error en el inicio de sesión."
      );
    }
  };

  // ===== INTERFAZ (JSX) =====
  return (
    <div className="register-container">
      <h2 className="register-title">Iniciar Sesión</h2>

      {/* Enlace al registro */}
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>

      {/* Muestra el mensaje solo si existe; el estilo depende de isError */}
      {message && (
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
      )}

      {/* Al enviar (botón o Enter) ejecuta handleLogin */}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          {/* Input controlado: su valor viene del estado */}
          <input
            type="email" // Valida formato de correo
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado por tecla
            required // No deja enviar vacío
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password" // Oculta los caracteres
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">Ingresar</button>
      </form>
    </div>
  );
};

// Exporta el componente para usarlo en el enrutador
export default Login;