import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaCircleUser } from "react-icons/fa6";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const body = { username, password };

      try {
        const response = await fetch("https://backendtodo-4u2b.onrender.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          Swal.fire({
            title: "Inicio de sesión exitoso",
            text: `Bienvenido, ${data.username}!`,
            icon: "success",
          });
          navigate("/tasks");
        } else {
          const errorData = await response.json();
          Swal.fire({
            title: "Error en las credenciales",
            text: errorData.message || "Por favor, verifica tu usuario y contraseña",
            icon: "error",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al conectarse con el servidor",
          icon: "error",
        });
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
    <div className="login-body">
      <header className="login-header">
        <img src="nextPlayerLogo.png" className="login-logo" alt="Logo" />
        <a href="mailto:proyectofinalreactjs@gmail.com" className="login-contact-link">
          Contact
        </a>
      </header>
      <div className="login-content">
        <FaCircleUser size={60} color="rgb(28, 90, 189)" />
        <input
          type="text"
          placeholder="Ingrese username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Iniciar sesión
        </button>
      </div>
      <a href="/register" className="login-register-link">
        ¿No tienes cuenta? Regístrate aquí
      </a>
      <footer className="login-footer">
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
}
