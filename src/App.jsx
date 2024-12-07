import "./styles/main.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import News from "./pages/News";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/news" element={<News />} />
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
