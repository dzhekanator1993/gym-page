import React from "react";

const AuthButtons = ({ user, openModal }) => {
  return (
    <div className="flex flex-col gap-2">
      {!user ? (
        <>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => openModal("register")}
          >
            Реєстрація
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => openModal("login")}
          >
            Авторизація
          </button>
        </>
      ) : (
        <>
          <div className="text-lg font-semibold">Вітаємо, {user.login}!</div>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => openModal("addNews")}
          >
            Додати новину
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
