import "./style.css";
import React from "react";

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="form-content">
      <p className="text-center text-lg">Ви впевнені, що хочете видалити новину?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Так
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          Ні
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
