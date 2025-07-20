import React, { useEffect, useState } from 'react';

const aboutImages = [
  'https://placehold.co/1200x800/EEDDBC/1A202C?text=About+Image+1',
  'https://placehold.co/1200x800/EEDDBC/2D3748?text=About+Image+2',
  'https://placehold.co/1200x800/EEDDBC/4A5568?text=About+Image+3'
];

const AboutSection = ({ title, buttonText, colors }) => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % aboutImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center flex items-end pb-12"
      style={{
        height: '420px',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        backgroundImage: `url("${aboutImages[activeDot]}")`,
        backgroundColor: colors.lightBeige,
        overflow: 'hidden'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"
        style={{
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px'
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-end">
        <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>
        <button className="px-8 py-4 rounded-full font-bold text-lg transition duration-300"
          style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground }}>
          {buttonText}
        </button>
        <div className="flex space-x-2 mb-2">
          {aboutImages.map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-full bg-white transition-opacity duration-300 ${activeDot === idx ? 'opacity-70' : 'opacity-30'}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
