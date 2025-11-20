import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import Teams from "./pages/Teams";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

//Added routing for the Navbar