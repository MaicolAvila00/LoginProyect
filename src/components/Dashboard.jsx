import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirigir si no hay sesión activa
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar sesión
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Bienvenido al Dashboard</h2>
      <button onClick={handleLogout} className="register-button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
