const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'username', required: true },
  time: { type: Date, default: Date.UTC },
});

module.exports = mongoose.model('News', NewsSchema);

