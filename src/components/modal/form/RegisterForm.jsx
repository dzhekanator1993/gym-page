import "./style.css";
import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ login, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="form-content">
      <input
        type="text"
        placeholder="Логін"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="name-label"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mail-label"
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-label"
        required
      />
      <button type="submit" className="btn btn-form">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
