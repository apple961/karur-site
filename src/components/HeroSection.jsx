import React, { useEffect, useState } from 'react';

// Dummy images array
const dummyImages = [
  'https://placehold.co/1200x800/1A202C/EEDDBC?text=Hero+Image+1',
  'https://placehold.co/1200x800/2D3748/EEDDBC?text=Hero+Image+2',
  'https://placehold.co/1200x800/4A5568/EEDDBC?text=Hero+Image+3'
];

const HeroSection = ({ buttonText, colors }) => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot(prev => (prev + 1) % dummyImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center flex items-end pb-12"
      style={{
        height: '620px',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        backgroundImage: `url("${dummyImages[activeDot]}")`,
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
        <button className="px-8 py-4 rounded-full font-bold text-lg transition duration-300"
          style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground }}>
          {buttonText}
        </button>
        <div className="flex space-x-2 mb-2">
          {dummyImages.map((_, idx) => (
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

export default HeroSection;
