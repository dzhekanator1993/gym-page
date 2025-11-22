const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'video', 'link', 'image'], default: 'link' }
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 200 },
  content: { type: String, required: true },
  videoUrl: { type: String },
  duration: { type: Number }, // в хвилинах
  order: { type: Number, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  moduleId: { type: String, required: true },
  resources: [ResourceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
