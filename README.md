# TernyGym — Онлайн Платформа для Фітнес Курсів

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8.2-teal.svg)](https://chakra-ui.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)

Професійна онлайн платформа для фітнес курсів з підтримкою відеоуроків, тестування та прогрес-трекінгу.

---

## 🚀 Швидкий Старт

### Вимоги

- Node.js >= 20
- npm або pnpm

### Встановлення

```bash
# Клонувати репозиторій
git clone https://github.com/dzhekanator1993/gym-page.git
cd gym-page

# Встановити залежності (Frontend)
npm install

# Встановити залежності (Backend)
cd backend
npm install
cd ..
```

### Налаштування Environment Variables

**Frontend (.env в корені):**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

**Backend (backend/.env):**
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

> ⚠️ **Важливо:** Ніколи не комітьте `.env` файли в git!

### Запуск Development

```bash
# Frontend (порт 3000)
npm start

# Backend (порт 5000) - в окремому терміналі
npm run backend

# Або обидва одночасно (якщо є concurrently)
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000) в браузері.

---

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

**Тестування PWA:**
```bash
npm run build
npx serve -s build
```

> ⚠️ PWA працює тільки через HTTPS (або localhost)

---

## 🔐 Environment Variables

### Frontend (.env)

| Змінна | Опис | Приклад |
|--------|------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

### Backend (backend/.env)

| Змінна | Опис | Приклад |
|--------|------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | JWT secret key | `your-super-secret-key-here` |
| `PORT` | Server port | `5000` |

**Створити .env файли:**
```bash
# Frontend
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Встановити Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables в Vercel:**
- `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

### Backend (Render)

1. Створити Web Service на [Render](https://render.com)
2. Підключити GitHub репозиторій
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`

**Environment Variables в Render:**
- `MONGO_URI` = `mongodb+srv://...`
- `JWT_SECRET` = `your-secret-key`
- `PORT` = `5000`

---

## 📋 Available Scripts

### Frontend

```bash
npm start          # Dev server (port 3000)
npm run build      # Production build
npm test           # Run tests
npm run backend    # Start backend server
```

### Backend

```bash
cd backend
npm start          # Start server (port 5000)
npm run dev        # Dev mode with nodemon
```

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
- 🎭 Demo акаунт для тестування
- 💾 localStorage auth (тимчасово)

### UI/UX
- 🎨 Chakra UI з темою #4F46E5
- 🌓 Dark mode toggle
- 📱 Responsive дизайн
- ✨ Smooth animations

---

## 🔧 Development

### Додати нову сторінку

1. Створити компонент в `src/pages/`
2. Додати route в `src/App.jsx`
3. Додати link в `src/components/navbar/Navbar.jsx`

### Додати новий API endpoint

1. Створити route в `backend/routes/`
2. Додати model в `backend/models/` (якщо потрібно)
3. Підключити route в `backend/server.js`

---

## 📚 Документація

- [Walkthrough](./walkthrough.md) — повний огляд всіх фаз
- [Vite Migration Plan](./vite_migration_plan.md) — план міграції на Vite
- [PWA Icons Guide](./PWA_ICONS_GUIDE.md) — генерація іконок
- [Security Checklist](./SECURITY_CHECKLIST.md) — безпека та deployment

---

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Знайти процес
lsof -ti:3000

# Вбити процес
kill -9 $(lsof -ti:3000)
```

### MongoDB connection error
- Перевірте `MONGO_URI` в `backend/.env`
- Переконайтесь, що IP адреса дозволена в MongoDB Atlas
- Перевірте username/password

### PWA не встановлюється
- Переконайтесь, що використовуєте HTTPS
- Перевірте manifest.json в DevTools
- Lighthouse audit для діагностики

---

## 🤝 Contributing

1. Fork репозиторій
2. Створити feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit зміни (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Відкрити Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👥 Authors

- **Dzhekanator** - [GitHub](https://github.com/dzhekanator1993)

---

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) — Component library
- [React Query](https://tanstack.com/query/latest) — Data fetching
- [React Player](https://github.com/cookpete/react-player) — Video player
- [Vite](https://vitejs.dev/) — Future build tool

---

**Made with ❤️ for fitness enthusiasts**
