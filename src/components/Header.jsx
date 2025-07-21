import React, { useState, useEffect } from 'react';

const Header = ({ colors }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setMenuOpen(open => !open);

  // Render the full-screen overlay when menu is open
  if (isMenuOpen) {
    return (
      <div
        className="fixed inset-0 z-40 flex flex-col px-4 md:px-8 py-6 md:py-8" // Full screen overlay
        style={{
          backgroundColor: 'rgba(0, 18, 20, 0.96)', // Dark background with transparency
          minHeight: '100vh',
          width: '100vw',
          left: 0,
          top: 0,
          overflowY: 'auto', // Allow scrolling within the overlay if content is long
        }}
      >
        {/* Top bar within the overlay: logo left, controls right, close button */}
        <div className="flex justify-between items-center w-full mb-12">
          {/* Logo */}
          <div>
            <span className="font-extrabold text-xl md:text-2xl leading-tight text-white">
              KARUR<br />
              {/* <span className="font-normal text-base">KARUR</span> */}
            </span>
          </div>
          {/* Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Icon */}
            <button className="text-white hover:text-gray-300 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {/* Order Tickets Button */}
            <button className="px-4 py-2 rounded-full font-bold text-sm transition duration-300"
              style={{
                backgroundColor: colors?.buttonBeige || '#e6c98b',
                color: colors?.darkBackground || '#181818'
              }}>
              ORDER TICKETS
            </button>
            {/* Close Button (X icon) */}
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none ml-2"
              aria-label="Close menu"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main content of the overlay: responsive layout */}
        <div className="flex flex-1 flex-col md:flex-row items-start justify-start pl-0 md:pl-16 pt-8 md:pt-0">
          {/* Main navigation links */}
          <nav className="flex flex-col space-y-6 text-3xl md:text-4xl font-extrabold text-white items-start w-full max-w-xs md:max-w-none md:w-auto">
            <a href="#" className="hover:text-gray-300 transition duration-300">VISIT</a>
            <a href="#" className="hover:text-gray-300 transition duration-300">SEE & DO</a>
            <a href="#" className="hover:text-gray-300 transition duration-300">COLLECTION</a>
            <a href="#" className="hover:text-gray-300 transition duration-300">ABOUT US</a>
          </nav>
          {/* "DIRECTLY TO" box */}
          <div className="mt-8 md:mt-0 md:ml-16 rounded-xl p-6 border w-full max-w-xs md:max-w-sm"
            style={{
              borderColor: colors?.buttonBeige || '#e6c98b',
              background: 'rgba(0,0,0,0.7)'
            }}>
            <h3 className="text-lg font-semibold mb-4 text-white">DIRECTLY TO</h3>
            <ul className="space-y-2 text-lg text-white">
              <li><a href="#" className="hover:text-gray-300 transition duration-300">Families & children</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-300">Education</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-300">Groups</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-300">A day in Karur</a></li>
              <li><a href="#" className="hover:text-gray-300 transition duration-300" style={{ color: colors?.buttonBeige || '#e6c98b' }}>Support us</a></li>
            </ul>
          </div>
        </div>
        {/* Footer info within the overlay */}
        <div className="pl-4 md:pl-16 pb-8 text-white text-base font-bold mt-auto">
          <h3 className="text-xl font-semibold mb-2">FRANS HALS MUSEUM</h3>
          <p className="font-normal">Groot Heiligland 62, Haarlem</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">LOCATION HAL</h3>
          <p className="font-normal">Grote Markt 16, Haarlem</p>
        </div>
      </div>
    );
  }

  // Render the compact header when menu is closed
  return (
    <header
      className="fixed top-6 left-1/2 z-50"
      style={{
        transform: 'translateX(-50%)',
        width: 'calc(100% - 48px)',
        maxWidth: '1200px',
        borderRadius: '9999px',
        background: 'rgba(30, 30, 30, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.18)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(31,38,135,0.45)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1.03)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31,38,135,0.37)';
        e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
      }}
    >
      <div className="flex items-center justify-between w-full px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="font-bold text-2xl" style={{
            color: '#fff',
            fontFamily: 'sans-serif',
            letterSpacing: '-2px',
            textShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}>
            KARUR<br />
            {/* <span className="font-normal text-base">KARUR</span> */}
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8 items-center">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ transition: 'background 0.2s, color 0.2s' }}
              >
                VISIT
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ transition: 'background 0.2s, color 0.2s' }}
              >
                SEE & DO
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ transition: 'background 0.2s, color 0.2s' }}
              >
                COLLECTION
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 px-4 py-2 rounded-full hover:bg-white/10"
                style={{ transition: 'background 0.2s, color 0.2s' }}
              >
                ABOUT US
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Top-Right Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Icon */}
          <button className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Order Tickets Button */}
          <button className="px-6 py-2 rounded-full font-bold text-sm transition duration-300"
            style={{ backgroundColor: colors?.buttonBeige || '#f5e9da', color: colors?.darkBackground || '#181818' }}>
            ORDER TICKETS
          </button>
          {/* Menu Icon */}
          <button onClick={toggleMenu} className="text-white focus:outline-none ml-2">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none" style={{ color: colors?.headerMenuIcon || '#fff' }}>
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
