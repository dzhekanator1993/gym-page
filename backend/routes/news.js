const express = require("express");
const News = require("../models/News");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Отримати всі опубліковані новини (публічний доступ)
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;

    const filter = { isPublished: true };
    if (category) filter.category = category;

    const newsList = await News.find(filter)
      .populate('author', 'username email')
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await News.countDocuments(filter);

    res.json({
      success: true,
      data: newsList,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні новин', error: error.message });
  }
});

// Отримати одну новину за ID (публічний доступ)
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'username email');

    if (!news) {
      return res.status(404).json({ success: false, message: 'Новина не знайдена' });
    }

    // Показувати неопубліковані новини тільки адмінам
    if (!news.isPublished && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ success: false, message: 'Новина не знайдена' });
    }

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні новини', error: error.message });
  }
});

// Додавання новини (тільки адміністратори)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, content, imageUrl, category, tags, isPublished } = req.body;

    const newsData = {
      title,
      content,
      author: req.user.id,
      imageUrl,
      category,
      tags,
      isPublished
    };

    // Встановити publishedAt якщо публікується
    if (isPublished) {
      newsData.publishedAt = new Date();
    }

    const newNews = new News(newsData);
    await newNews.save();

    res.status(201).json({ success: true, data: newNews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при додаванні новини', error: error.message });
  }
});

// Оновлення новини (тільки адміністратори)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, message: 'Новина не знайдена' });
    }

    const { title, content, imageUrl, category, tags, isPublished } = req.body;

    // Оновити поля
    if (title !== undefined) news.title = title;
    if (content !== undefined) news.content = content;
    if (imageUrl !== undefined) news.imageUrl = imageUrl;
    if (category !== undefined) news.category = category;
    if (tags !== undefined) news.tags = tags;

    // Встановити publishedAt якщо публікується вперше
    if (isPublished !== undefined) {
      if (isPublished && !news.isPublished) {
        news.publishedAt = new Date();
      }
      news.isPublished = isPublished;
    }

    await news.save();

    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при оновленні новини', error: error.message });
  }
});

// Видалення новини (тільки адміністратори)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ success: false, message: "Новина не знайдена" });
    }

    res.json({ success: true, message: "Новина успішно видалена" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Помилка видалення новини", error: error.message });
  }
});

module.exports = router;
