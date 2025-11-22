const express = require("express");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Отримати всі курси
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { category, difficulty } = req.query;

    const filter = {};

    // Admin бачить всі курси, student - тільки опубліковані
    if (req.user.role !== 'admin') {
      filter.isPublished = true;
    }

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const courses = await Course.find(filter)
      .populate('createdBy', 'username email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні курсів', error: error.message });
  }
});

// Отримати один курс за ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate({
        path: 'modules.lessons',
        select: 'title duration order'
      });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Курс не знайдено' });
    }

    // Перевірка доступу для студентів
    if (req.user.role !== 'admin' && !course.isPublished) {
      return res.status(403).json({ success: false, message: 'Курс недоступний' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні курсу', error: error.message });
  }
});

// Створити курс (тільки admin)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, description, imageUrl, category, difficulty, modules } = req.body;

    const courseData = {
      title,
      description,
      imageUrl,
      category,
      difficulty,
      createdBy: req.user.id,
      modules: modules || []
    };

    const newCourse = new Course(courseData);
    await newCourse.save();

    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при створенні курсу', error: error.message });
  }
});

// Оновити курс (тільки admin)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Курс не знайдено' });
    }

    const { title, description, imageUrl, category, difficulty, modules, isPublished } = req.body;

    if (title !== undefined) course.title = title;
    if (description !== undefined) course.description = description;
    if (imageUrl !== undefined) course.imageUrl = imageUrl;
    if (category !== undefined) course.category = category;
    if (difficulty !== undefined) course.difficulty = difficulty;
    if (modules !== undefined) course.modules = modules;

    // Встановити publishedAt якщо публікується вперше
    if (isPublished !== undefined) {
      if (isPublished && !course.isPublished) {
        course.publishedAt = new Date();
      }
      course.isPublished = isPublished;
    }

    await course.save();

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при оновленні курсу', error: error.message });
  }
});

// Видалити курс (тільки admin)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Курс не знайдено" });
    }

    // Видалити всі уроки курсу
    await Lesson.deleteMany({ courseId: req.params.id });

    res.json({ success: true, message: "Курс успішно видалено" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Помилка видалення курсу", error: error.message });
  }
});

// Опублікувати/зняти з публікації курс (тільки admin)
router.patch("/:id/publish", authMiddleware, adminOnly, async (req, res) => {
  try {
    const { isPublished } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Курс не знайдено" });
    }

    course.isPublished = isPublished;
    if (isPublished && !course.publishedAt) {
      course.publishedAt = new Date();
    }

    await course.save();

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Помилка публікації курсу", error: error.message });
  }
});

module.exports = router;
