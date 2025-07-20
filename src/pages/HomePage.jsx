import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx';
import AboutSection from '../components/AboutSection.jsx';
import WelcomeSection from '../components/WelcomeSection.jsx';
import HighlightsSection from '../components/HighlightsSection.jsx';
import NewsSection from '../components/NewsSection.jsx';
import Footer from '../components/Footer.jsx';
import { colors } from '../App.jsx'; // Import colors from App.jsx

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu (passed to Header)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} colors={colors} />
      <main>
        <HeroSection
          buttonText="ABOUT THE PLACE"
          colors={colors}
        />
        <WelcomeSection colors={colors} />
        <HighlightsSection colors={colors} />
        <AboutSection
          title="ABOUT FRANS HALS"
          buttonText="GO TO PAGE"
          colors={colors}
        />
        <NewsSection colors={colors} />
      </main>
      <Footer colors={colors} />
    </>
  );
};

export default HomePage;
