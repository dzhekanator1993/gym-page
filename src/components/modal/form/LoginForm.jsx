import "./style.css";
import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ login, password });
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
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="password-label"
        required
      />
      <button type="submit" className="btn btn-form">
        Увійти
      </button>
    </form>
  );
};

export default LoginForm;
