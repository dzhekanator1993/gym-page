const express = require("express");
const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Отримати урок за ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('courseId', 'title isPublished');

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Урок не знайдено' });
    }

    // Перевірка доступу для студентів
    if (req.user.role !== 'admin' && !lesson.courseId.isPublished) {
      return res.status(403).json({ success: false, message: 'Урок недоступний' });
    }

    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні уроку', error: error.message });
  }
});

// Створити урок (тільки admin)
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { title, content, videoUrl, duration, order, courseId, moduleId, resources } = req.body;

    // Перевірка чи існує курс
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Курс не знайдено' });
    }

    const lessonData = {
      title,
      content,
      videoUrl,
      duration,
      order,
      courseId,
      moduleId,
      resources: resources || []
    };

    const newLesson = new Lesson(lessonData);
    await newLesson.save();

    // Додати урок до модуля курсу
    const module = course.modules.id(moduleId);
    if (module) {
      module.lessons.push(newLesson._id);
      await course.save();
    }

    res.status(201).json({ success: true, data: newLesson });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при створенні уроку', error: error.message });
  }
});

// Оновити урок (тільки admin)
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Урок не знайдено' });
    }

    const { title, content, videoUrl, duration, order, resources } = req.body;

    if (title !== undefined) lesson.title = title;
    if (content !== undefined) lesson.content = content;
    if (videoUrl !== undefined) lesson.videoUrl = videoUrl;
    if (duration !== undefined) lesson.duration = duration;
    if (order !== undefined) lesson.order = order;
    if (resources !== undefined) lesson.resources = resources;

    await lesson.save();

    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при оновленні уроку', error: error.message });
  }
});

// Видалити урок (тільки admin)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ success: false, message: "Урок не знайдено" });
    }

    // Видалити урок з модуля курсу
    const course = await Course.findById(lesson.courseId);
    if (course) {
      const module = course.modules.id(lesson.moduleId);
      if (module) {
        module.lessons.pull(lesson._id);
        await course.save();
      }
    }

    await lesson.deleteOne();

    res.json({ success: true, message: "Урок успішно видалено" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Помилка видалення уроку", error: error.message });
  }
});

module.exports = router;
