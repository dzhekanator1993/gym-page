const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 200 },
  content: { type: String, required: true, minlength: 20 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
  category: { type: String, enum: ['fitness', 'nutrition', 'lifestyle'], default: 'fitness' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);

