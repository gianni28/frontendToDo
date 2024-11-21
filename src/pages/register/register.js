import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./register.css"; // Importar CSS estándar

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username !== "" && email !== "" && password !== "") {
      const body = { username, email, password };

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
            text:
              errorData.message || "El usuario ya existe o hubo un problema",
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
    <div className="register-body">
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
      <div className="register-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button onClick={handleRegister} className="register-button">
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
