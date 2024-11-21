import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

import { AuthProvider, useAuth } from "./context/AuthContext";

export default function App() {
  //const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
