const express = require("express");
const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Отримати всі новини
router.get('/', async (req, res) => {
  try {
    const newsList = await News.find().sort({ time: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при отриманні новин' });
  }
});

// Додавання новини (лише авторизовані)
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const author = req.user.username; // Беремо автора з токена
  try {
    const newNews = new News({ title, content, author });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ message: 'Помилка при додаванні новини' });
  }
});

// Видалення новини (лише авторизовані)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "Новина не знайдена" });
    }
    res.json({ message: "Новина видалена" });
  } catch (error) {
    res.status(500).json({ message: "Помилка видалення новини" });
  }
});

module.exports = router;
