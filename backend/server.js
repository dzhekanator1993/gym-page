require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string';


//Підключення роутів auth
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
//Підключення роута news
const newsRoutes = require('./routes/news');
app.use('/api/news', newsRoutes);
//Підключення роута courses
const coursesRoutes = require('./routes/courses');
app.use('/api/courses', coursesRoutes);
//Підключення роута lessons
const lessonsRoutes = require('./routes/lessons');
app.use('/api/lessons', lessonsRoutes);
//Підключення роута progress
const progressRoutes = require('./routes/progress');
app.use('/api/progress', progressRoutes);


// Підключення до бази даних
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));