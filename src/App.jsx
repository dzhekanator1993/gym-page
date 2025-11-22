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
import CourseManagement from "./pages/admin/CourseManagement";
import CourseEditor from "./pages/admin/CourseEditor";
import LessonEditor from "./pages/admin/LessonEditor";

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

          {/* Protected Routes */}
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />
          <Route path="/courses/:courseId/lessons/:lessonId" element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/courses" element={
            <ProtectedRoute>
              <CourseManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses/new" element={
            <ProtectedRoute>
              <CourseEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses/:id/edit" element={
            <ProtectedRoute>
              <CourseEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/lessons/new" element={
            <ProtectedRoute>
              <LessonEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/lessons/:lessonId/edit" element={
            <ProtectedRoute>
              <LessonEditor />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
