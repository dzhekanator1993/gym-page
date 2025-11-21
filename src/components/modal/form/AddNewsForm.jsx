import "./style.css";
import React, { useState } from "react";

const AddNewsForm = ({ onAddNews }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = {
      id: Date.now(),
      title,
      text,
      author: "Автор", // тут можна брати з user.login
      time: new Date().toLocaleString(),
    };
    onAddNews(newNews);
  };

  return (
    <form onSubmit={handleSubmit} className="form-content">
      <input
        type="text"
        placeholder="Заголовок новини"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="name-label"
        required
      />
      <textarea
        placeholder="Текст новини"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="message-input"
        required
      ></textarea>
      <button type="submit" className="btn btn-form">
        Add News
      </button>
    </form>
  );
};

export default AddNewsForm;
