import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./register.css"; // Importar CSS estándar

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa un email válido",
        icon: "error",
      });
      return;
    }
  
    if (username !== "" && email !== "" && password !== "") {
      const body = { username, email, password };
      setIsLoading(true);
  
      try {
        const response = await fetch("https://backendtodo-4u2b.onrender.com/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          Swal.fire({
            title: "Registro exitoso",
            text: "Ahora puedes iniciar sesión",
            icon: "success",
          });
          navigate("/login");
        } else {
          const errorData = await response.json();
          Swal.fire({
            title: "Error",
            text: errorData.message || "El registro falló. Por favor, intenta nuevamente.",
            icon: "error",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al conectarse con el servidor",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
      });
    }
  };
  

  return (
    <div className="register-body">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Cargando...</p>
        </div>
      )}
      <header className="register-header">
        <img src="nextPlayerLogo.png" className="register-logo" alt="Logo" />
        <a
          href="mailto:proyectofinalreactjs@gmail.com"
          className="register-contact-link"
        >
          Contact
        </a>
      </header>
      <h1>Bienvenido/a!</h1>
      <div className="register-form" style={{ opacity: isLoading ? 0.5 : 1 }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <button
          onClick={handleRegister}
          className="register-button"
          disabled={isLoading} // Deshabilitar botón si está cargando
        >
          Registrarse
        </button>
        <a href="/login" className="register-login-link">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </a>
      </div>
      <footer className="register-footer">
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
}
