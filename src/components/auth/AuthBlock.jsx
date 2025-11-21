import React from 'react';

const AuthBlock = ({ user, openModal }) => {
  return (
    <div className="auth-buttons">
      {!user ? (
        <>
          <button onClick={() => openModal("register")}>Реєстрація</button>
          <button onClick={() => openModal("login")}>Авторизація</button>
        </>
      ) : (
        <div className="user-info">
          <div className="username">{user.login}!</div>
          <button className="add-news-button" onClick={() => openModal("addNews")}>
            Додати новину
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBlock;
