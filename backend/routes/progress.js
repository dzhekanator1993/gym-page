const express = require("express");
const Progress = require("../models/Progress");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Отримати прогрес студента по курсу
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    let progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    }).populate('completedLessons', 'title order');

    // Якщо прогресу немає - створити
    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        courseId: req.params.courseId
      });
      await progress.save();
    }

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні прогресу', error: error.message });
  }
});

// Відмітити урок як завершений
router.post('/:courseId/complete', authMiddleware, async (req, res) => {
  try {
    const { lessonId } = req.body;

    // Перевірка чи існує урок
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Урок не знайдено' });
    }

    // Знайти або створити прогрес
    let progress = await Progress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.user.id,
        courseId: req.params.courseId
      });
    }

    // Додати урок до завершених (якщо ще не додано)
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    progress.lastAccessedLesson = lessonId;

    // Порахувати прогрес
    const course = await Course.findById(req.params.courseId);
    const totalLessons = await Lesson.countDocuments({ courseId: req.params.courseId });
    progress.progress = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;

    // Якщо всі уроки завершені - встановити completedAt
    if (progress.progress === 100 && !progress.completedAt) {
      progress.completedAt = new Date();
    }

    await progress.save();

    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при оновленні прогресу', error: error.message });
  }
});

// Отримати всіх студентів (admin only)
router.get('/admin/students', authMiddleware, adminOnly, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні студентів', error: error.message });
  }
});

// Отримати прогрес конкретного студента (admin only)
router.get('/admin/student/:userId', authMiddleware, adminOnly, async (req, res) => {
  try {
    const student = await User.findById(req.params.userId).select('-password');

    if (!student) {
      return res.status(404).json({ success: false, message: 'Студента не знайдено' });
    }

    const progresses = await Progress.find({ userId: req.params.userId })
      .populate('courseId', 'title imageUrl category')
      .populate('completedLessons', 'title')
      .sort({ updatedAt: -1 });

    // Додати інформацію про кількість уроків в кожному курсі
    const progressesWithDetails = await Promise.all(
      progresses.map(async (progress) => {
        const totalLessons = await Lesson.countDocuments({ courseId: progress.courseId._id });
        return {
          ...progress.toObject(),
          totalLessons,
          completedCount: progress.completedLessons.length
        };
      })
    );

    res.json({
      success: true,
      data: {
        student,
        courses: progressesWithDetails
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Помилка при отриманні прогресу студента', error: error.message });
  }
});

module.exports = router;
