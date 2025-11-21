const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Реєстрація користувача
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Перевірка, чи існує такий email
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email вже використовується' });

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення нового користувача
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Користувач створений!' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Логін користувача
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Перевірка, чи є користувач у базі
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Невірний email або пароль' });

    // Перевірка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Невірний email або пароль' });

    // Генерація JWT
    const token = jwt.sign(
      { id: user._id, userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Перевірка токена
router.get("/check-token", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "Немає токена" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ valid: false });
    }

    res.json({ valid: true, user: { email: user.email } });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Недійсний токен" });
  }
});



module.exports = router;
