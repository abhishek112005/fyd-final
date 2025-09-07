import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Hospitals from "./pages/Hospitals";
import Insurance from "./pages/Insurance";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
