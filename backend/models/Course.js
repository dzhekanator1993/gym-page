const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 200 },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, enum: ['fitness', 'nutrition', 'lifestyle', 'strength', 'cardio'], default: 'fitness' },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  modules: [ModuleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
