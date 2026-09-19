import React, { useState } from "react";
import axios from "axios";
import "../Styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    if (!email.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {

        email: email.trim(),
        password: password.trim(),
      });
      

      setMessage(response.data.message || "Regisltro exitoso");
      setIsError(false);
      setEmail("");
      setPassword("");

      // Redirigir solo si el registro fue exitoso
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "Error en el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>

      {message && (
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
      )}

      <form onSubmit={handleRegister}>
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

        <button type="submit" className="register-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
