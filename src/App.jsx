import "./styles/main.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Contacts />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected Routes - потребують авторизації */}
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/course/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/lesson/:id" element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
