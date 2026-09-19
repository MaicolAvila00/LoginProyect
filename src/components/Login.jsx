import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"; // Usa los mismos estilos que Register
import { Link } from "react-router-dom";



const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // RUTA DEL SERVIDOR

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    if (!email || !password) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Guardar el token
      setMessage("Inicio de sesión exitoso!");
      setIsError(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Error en el inicio de sesión."
      );
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Iniciar Sesión</h2>

      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
      {message && (
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
      )}

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
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

export default Login;
