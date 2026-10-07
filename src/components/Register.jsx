// Traigo lo que necesito de React y de otras librerías
import React, { useState } from "react"; // useState sirve para "recordar" lo que el usuario escribe
import axios from "axios"; // Con esto le hablo al servidor (mi API)
import "../Styles/Register.css"; // Los estilos de esta pantalla
import { useNavigate } from "react-router-dom"; // Para mandar al usuario a otra página

// La dirección de mi servidor. En producción viene de una variable de entorno;
// si no existe, uso mi computador (localhost) para probar mientras desarrollo
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // RUTA DEL SERVIDOR

// Esta es la pantalla de registro
const Register = () => {
  // Cosas que la pantalla tiene que recordar
  const [email, setEmail] = useState(""); // El correo que está escribiendo la persona
  const [password, setPassword] = useState(""); // La contraseña que está escribiendo
  const [message, setMessage] = useState(null); // Un aviso para la persona ("registro exitoso", "falta un campo"...)
  const [isError, setIsError] = useState(false); // Me dice si el aviso es bueno o malo, para pintarlo verde o rojo
  const navigate = useNavigate(); // Mi "control remoto" para cambiar de página

  // Esto pasa cuando la persona le da a "Registrarse"
  const handleRegister = async (e) => {
    e.preventDefault(); // Por defecto el formulario recarga la página; aquí le digo que no lo haga
    setMessage(null); // Borro avisos viejos para empezar limpio
    setIsError(false);

    // Primero reviso que no deje nada vacío.
    // El trim() quita los espacios de los lados, así "   " tampoco cuenta como escrito
    if (!email.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios.");
      setIsError(true);
      return; // Me salgo: no tiene sentido molestar al servidor con datos vacíos
    }

    try {
      // Le mando al servidor el correo y la contraseña para que cree la cuenta.
      // Los mando sin espacios sobrantes. El await es "espera a que responda"
      const response = await axios.post(`${API_URL}/auth/register`, {

        email: email.trim(),
        password: password.trim(),
      });
      

      // Si todo salió bien, muestro el mensaje que mandó el servidor
      // (y si no mandó ninguno, uso uno mío)
      setMessage(response.data.message || "Regisitro exitoso");
      setIsError(false);
      setEmail(""); // Vacío los campos para que no queden los datos en pantalla
      setPassword("");

      // Redirigir solo si el registro fue exitoso
      // Espero un segundito y medio para que alcance a leer el mensaje y lo llevo al dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      // Si algo falla (por ejemplo, el correo ya existe, o el servidor está caído) caigo aquí
      setIsError(true);
      // Si el servidor me explicó qué pasó, se lo muestro;
      // si no, le digo algo general y que lo intente otra vez
      setMessage(error.response?.data?.message || "Error en el registro. Inténtalo de nuevo.");
    }
  };

  // Lo que la persona ve en pantalla
  return (
    <div className="register-container">
      <h2 className="register-title">Registro</h2>

      {/* Si hay un aviso, lo muestro; si es error sale de un estilo, si es éxito de otro */}
      {message && (
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
      )}

      {/* Cuando envían el formulario (botón o Enter) se ejecuta handleRegister */}
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Email</label>
          {/* Lo que se escribe se guarda en el estado con cada tecla, así siempre sé qué hay en el campo */}
          <input
            type="email" // El navegador revisa que parezca un correo
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required // No deja enviar si está vacío
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password" // Muestra puntitos en lugar de las letras
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

// Lo dejo disponible para usarlo en el resto de la aplicación
export default Register;