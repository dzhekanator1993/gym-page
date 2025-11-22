const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  lastAccessedLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  progress: { type: Number, default: 0, min: 0, max: 100 } // відсоток завершення
}, { timestamps: true });

// Індекс для швидкого пошуку
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
