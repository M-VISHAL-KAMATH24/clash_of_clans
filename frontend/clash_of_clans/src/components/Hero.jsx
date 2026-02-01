import { useState } from 'react';

const Hero = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const navButtons = [
    { name: 'Clans', path: '/clans', color: 'gold', hoverColor: 'yellow' },
    { name: 'Players', path: '/players', color: 'blue', hoverColor: 'sky' },
    { name: 'Leagues', path: '/leagues', color: 'purple', hoverColor: 'violet' },
    { name: 'Locations', path: '/locations', color: 'red', hoverColor: 'rose' }
  ];

  const getButtonColors = (color, hoverColor, index) => {
    const colors = {
      gold: 'border-yellow-400 text-yellow-400 hover:border-yellow-300 hover:shadow-yellow-400/50',
      blue: 'border-blue-400 text-blue-400 hover:border-blue-300 hover:shadow-blue-400/50',
      purple: 'border-purple-400 text-purple-400 hover:border-purple-300 hover:shadow-purple-400/50',
      red: 'border-red-400 text-red-400 hover:border-red-300 hover:shadow-red-400/50'
    };
    return colors[color];
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Animation */}
     <img
  src="/images/coc.jpg"
  alt="Clash of Clans Background"
  className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
  style={{ zIndex: -2 }}
/>

      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"
        style={{ zIndex: -1 }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-[10%] left-[5%] w-20 h-20 border-4 border-yellow-400/30 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] w-16 h-16 border-4 border-blue-400/30 rotate-45 animate-float-reverse pointer-events-none" />

      {/* Hero Content */}
      <div className="text-center z-10 px-4 animate-fade-in-up">
        {/* Welcome Message */}
        <h1 className="font-cinzel font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-400 uppercase tracking-widest mb-4 animate-glow-pulse"
            style={{
              textShadow: '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 4px 4px 8px rgba(0, 0, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.6)'
            }}>
          Welcome to Clash of Clans
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-barlow tracking-[0.15em] mb-16 animate-fade-in"
           style={{
             textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
             animationDelay: '0.3s'
           }}>
          Build. Battle. Conquer.
        </p>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto px-4 animate-fade-in"
             style={{ animationDelay: '0.6s' }}>
          {navButtons.map((button, index) => (
            <a
              key={button.name}
              href={button.path}
              onMouseEnter={() => setHoveredButton(index)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`
                relative overflow-hidden
                px-8 py-6 
                font-cinzel font-bold text-xl tracking-wider uppercase
                bg-gradient-to-br from-slate-900/90 to-slate-800/90
                border-4 rounded-xl
                cursor-pointer
                transition-all duration-500 ease-out
                ${getButtonColors(button.color, button.hoverColor, index)}
                hover:transform hover:-translate-y-2 hover:scale-105
                hover:shadow-2xl
                active:translate-y-0 active:scale-100
                flex items-center justify-center
                group
              `}
              style={{
                boxShadow: hoveredButton === index 
                  ? '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.4)'
                  : '0 5px 15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 215, 0, 0.2)'
              }}
            >
              {/* Shimmer Effect */}
              <div 
                className={`
                  absolute top-0 left-0 w-full h-full
                  bg-gradient-to-r from-transparent via-white/20 to-transparent
                  transition-transform duration-700
                  ${hoveredButton === index ? 'translate-x-full' : '-translate-x-full'}
                `}
              />

              {/* Radial Glow Effect */}
              <div 
                className={`
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  rounded-full bg-yellow-400/30 blur-xl
                  transition-all duration-700
                  ${hoveredButton === index ? 'w-96 h-96' : 'w-0 h-0'}
                `}
              />

              {/* Button Text */}
              <span 
                className="relative z-10 transition-all duration-300 group-hover:drop-shadow-glow"
                style={{
                  textShadow: hoveredButton === index 
                    ? '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5)' 
                    : 'none'
                }}
              >
                {button.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;