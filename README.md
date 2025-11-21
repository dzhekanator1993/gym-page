# TernyGym — Онлайн Платформа для Фітнес Курсів

Тут буде професійна онлайн платформа для фітнес курсів з підтримкою відеоуроків, тестування та прогрес-трекінгу.

## 📂 Структура Проєкту

```
gym-page/
├── public/                    # Статичні файли
│   ├── manifest.json          # PWA manifest
│   ├── offline.html           # Offline fallback
│   ├── icon-*.png             # PWA іконки
│   └── index.html
│
├── src/                       # Frontend код
│   ├── theme/                 # Chakra UI тема
│   │   └── index.js           # Theme config (#4F46E5)
│   │
│   ├── pages/                 # Сторінки
│   │   ├── Home.jsx
│   │   ├── Courses.jsx        # Список курсів
│   │   ├── CourseDetail.jsx   # Деталі курсу + модулі
│   │   ├── Lesson.jsx         # Урок (video/text/quiz)
│   │   ├── Login.jsx          # Форма входу
│   │   ├── Auth.jsx           # Auth landing
│   │   ├── Contacts.jsx
│   │   └── News.jsx
│   │
│   ├── components/            # Компоненти
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── btnDarkMode/       # Dark mode toggle
│   │   └── ...
│   │
│   ├── App.jsx                # Main app + routes
│   ├── index.js               # Entry point
│   └── serviceWorkerRegistration.js  # PWA service worker
│
├── backend/                   # Backend API (Node.js + Express)
│   ├── models/                # MongoDB models
│   ├── routes/                # API routes
│   ├── server.js              # Express server
│   └── package.json
│
├── package.json               # Frontend dependencies
├── .env.example               # Environment variables template
└── README.md                  # Ця документація
```

---

## 🎨 Технології

### Frontend
- **React** 18.3.1 — UI framework
- **Chakra UI** 2.8.2 — Component library
- **React Router** 6.26.2 — Routing
- **React Query** 5.17.19 — Data fetching
- **React Player** 2.14.1 — Video player
- **Framer Motion** 11.0.3 — Animations

### Backend
- **Node.js** + **Express** — REST API
- **MongoDB** + **Mongoose** — Database
- **JWT** — Authentication

### Build Tools
- **Create React App** — Current bundler
- **Vite** — Planned migration (see `vite_migration_plan.md`)

---

## 📱 PWA Features

- ✅ Installable (Add to Home Screen)
- ✅ Offline підтримка
- ✅ Service Worker
- ✅ iOS/Android/Windows підтримка
- ✅ Manifest.json
---

## 🎓 Функціональність

### Курси
- 📚 Список курсів з карточками
- 📊 Прогрес-бар проходження
- 📂 Модульна структура
- 🔒 Locked lessons система

### Уроки
- 🎥 Video уроки (YouTube integration)
- 📄 Text уроки (форматований контент)
- ✅ Quiz уроки (інтерактивні тести)
- 🎯 Перевірка відповідей та scoring

### Авторизація
- 🔐 Login/Register форми

### UI/UX
- 🎨 Chakra UI з темою #4F46E5
- 🌓 Dark mode toggle
- 📱 Responsive дизайн
- ✨ Smooth animations

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👥 Authors

- **Dzhonni_D** - [GitHub](https://github.com/dzhekanator1993)

---

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) — Component library
- [React Query](https://tanstack.com/query/latest) — Data fetching
- [React Player](https://github.com/cookpete/react-player) — Video player
- [Vite](https://vitejs.dev/) — Future build tool

---

**Made with ❤️ for fitness enthusiasts**
