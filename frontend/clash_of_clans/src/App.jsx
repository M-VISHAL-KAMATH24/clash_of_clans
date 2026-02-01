import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Clans from "./pages/Clans";
import Players from "./pages/Players";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/clans" element={<Clans />} />
        <Route path="/players" element={<Players/>} />

        {/* placeholders for now */}
        <Route path="/leagues" element={<div>Leagues Page</div>} />
        <Route path="/locations" element={<div>Locations Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
