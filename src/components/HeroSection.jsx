import React, { useEffect, useState } from 'react';

// Enhanced slides data with different content for each slide
const slidesData = [
  {
    image: 'https://placehold.co/1200x800/1A202C/EEDDBC?text=Discover+Karur',
    title: 'Discover Karur',
    subtitle: 'Ancient heritage meets modern charm',
    buttonText: 'EXPLORE NOW'
  },
  {
    image: 'https://placehold.co/1200x800/2D3748/EEDDBC?text=Cultural+Heritage',
    title: 'Cultural Heritage',
    subtitle: 'Temples, traditions, and timeless stories',
    buttonText: 'LEARN MORE'
  },
  {
    image: 'https://placehold.co/1200x800/4A5568/EEDDBC?text=Visit+Today',
    title: 'Visit Today',
    subtitle: 'Create unforgettable memories',
    buttonText: 'PLAN VISIT'
  }
];

const HeroSection = ({ colors }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  const nextSlide = () => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      setActiveSlide(prev => (prev + 1) % slidesData.length);
      setFadeClass('opacity-100');
    }, 300);
  };

  const prevSlide = () => {
    setFadeClass('opacity-0');
    setTimeout(() => {
      setActiveSlide(prev => (prev - 1 + slidesData.length) % slidesData.length);
      setFadeClass('opacity-100');
    }, 300);
  };

  const goToSlide = (index) => {
    if (index !== activeSlide) {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setActiveSlide(index);
        setFadeClass('opacity-100');
      }, 300);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section
      className="relative bg-cover bg-center flex items-center justify-center"
      style={{
        width: '100%',
        height: '620px',
        borderBottomLeftRadius: '40px',
        borderBottomRightRadius: '40px',
        backgroundColor: colors.lightBeige,
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Fade Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${fadeClass}`}
        style={{
          backgroundImage: `url("${slidesData[activeSlide].image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"
        style={{
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px'
        }}
      />

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 group"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Content - Centered */}
        <div className="text-center mb-16">
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 transition-all duration-500 ${fadeClass}`}
            style={{ 
              fontFamily: 'serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '0.02em'
            }}
          >
            {slidesData[activeSlide].title}
          </h1>
          <p 
            className={`text-xl md:text-2xl text-white mb-8 transition-all duration-500 delay-100 ${fadeClass}`}
            style={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {slidesData[activeSlide].subtitle}
          </p>
          <button 
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 delay-200 hover:scale-105 hover:shadow-lg ${fadeClass}`}
            style={{ 
              backgroundColor: colors.buttonBeige, 
              color: colors.darkBackground,
              transform: 'translateY(0)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            {slidesData[activeSlide].buttonText}
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-3 w-3 rounded-full transition-all duration-300 hover:scale-125 ${
                activeSlide === idx 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-70'
              }`}
              style={{
                boxShadow: activeSlide === idx ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: isHovered ? '0%' : `${((activeSlide + 1) / slidesData.length) * 100}%`
            }}
          />
        </div>
      </div>
    </section>
  );
};


export default HeroSection;
