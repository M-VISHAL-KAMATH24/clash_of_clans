import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import Clans from "./pages/Clans";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Hero />} />

          {/* Clans Page */}
          <Route path="/clans" element={<Clans />} />

          {/* Optional: future routes */}
          {/* <Route path="/players" element={<Players />} /> */}
          {/* <Route path="/leagues" element={<Leagues />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
