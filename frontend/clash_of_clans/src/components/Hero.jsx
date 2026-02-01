import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const navButtons = [
    { name: "Clans", path: "/clans", color: "gold" },
    { name: "Players", path: "/players", color: "blue" },
    { name: "Leagues", path: "/leagues", color: "purple" },
    { name: "Locations", path: "/locations", color: "red" },
  ];

  const getButtonColors = (color) => {
    const colors = {
      gold: "border-yellow-400 text-yellow-400 hover:border-yellow-300 hover:shadow-yellow-400/50",
      blue: "border-blue-400 text-blue-400 hover:border-blue-300 hover:shadow-blue-400/50",
      purple: "border-purple-400 text-purple-400 hover:border-purple-300 hover:shadow-purple-400/50",
      red: "border-red-400 text-red-400 hover:border-red-300 hover:shadow-red-400/50",
    };
    return colors[color];
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* ✅ BACKGROUND IMAGE */}
      <img
        src="/images/coc.jpg"
        alt="Clash of Clans Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -2 }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"
        style={{ zIndex: -1 }}
      />

      {/* HERO CONTENT */}
      <div className="text-center z-10 px-4">
        <h1 className="font-cinzel font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-400 uppercase tracking-widest mb-4">
          Welcome to Clash of Clans
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 tracking-[0.15em] mb-16">
          Build. Battle. Conquer.
        </p>

        {/* NAV BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {navButtons.map((button, index) => (
            <Link
              key={button.name}
              to={button.path}
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`
                relative overflow-hidden
                px-8 py-6 
                font-cinzel font-bold text-xl tracking-wider uppercase
                bg-gradient-to-br from-slate-900/90 to-slate-800/90
                border-4 rounded-xl
                transition-all duration-300
                ${getButtonColors(button.color)}
                hover:-translate-y-2 hover:scale-105 hover:shadow-2xl
                flex items-center justify-center
              `}
            >
              {button.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
