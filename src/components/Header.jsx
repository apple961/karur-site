import React, { useState } from 'react';

// Dummy flag icon (replace with actual image or SVG as needed)
const FlagIcon = () => (
  <span className="ml-2">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="12" fill="#fff" />
      <rect x="2" y="7" width="20" height="5" fill="#c8102e" />
      <rect x="2" y="12" width="20" height="5" fill="#012169" />
    </svg>
  </span>
);

const Header = ({ colors }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(open => !open);

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
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="font-bold text-2xl" style={{
            color: '#fff',
            fontFamily: 'sans-serif',
            letterSpacing: '-2px',
            textShadow: '0 2px 8px rgba(0,0,0,0.18)'
          }}>
            KARUR<br />
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
            <li>
              {/* Search Icon */}
              <button className="text-gray-300 hover:text-white focus:outline-none ml-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </li>
            <li>
              {/* Order Tickets Button */}
              <button className="px-6 py-2 rounded-full font-bold text-sm transition duration-300"
                style={{ backgroundColor: colors?.buttonBeige || '#f5e9da', color: colors?.darkBackground || '#181818' }}>
                ORDER TICKETS
              </button>
            </li>
            <li>
              {/* Menu Icon for Desktop */}
              <button onClick={toggleMenu} className="text-white focus:outline-none ml-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
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

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col p-8" style={{ backgroundColor: colors?.darkBackground || '#181818' }}>
          <div className="flex justify-between items-center mb-12">
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold" style={{ color: colors?.white || '#fff' }}>
                KARUR<br />
              </a>
            </div>
            <div className="flex items-center space-x-4">
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
              {/* Close Button */}
              <button onClick={toggleMenu} className="focus:outline-none ml-4" style={{ color: colors?.headerMenuIcon || '#fff' }}>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-grow flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-20">
            <nav className="flex flex-col space-y-4 text-3xl font-bold" style={{ color: colors?.white || '#fff' }}>
              <a href="#" className="hover:text-gray-300 transition duration-300 px-4 py-2 rounded-full hover:bg-white/10">VISIT</a>
              <a href="#" className="hover:text-gray-300 transition duration-300 px-4 py-2 rounded-full hover:bg-white/10" style={{ textDecoration: 'underline' }}>SEE & DO</a>
              <a href="#" className="hover:text-gray-300 transition duration-300 px-4 py-2 rounded-full hover:bg-white/10">COLLECTION</a>
              <a href="#" className="hover:text-gray-300 transition duration-300 px-4 py-2 rounded-full hover:bg-white/10">ABOUT US</a>
            </nav>
            <div className="mt-8 md:mt-0">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors?.textGray || '#aaa' }}>DIRECTLY TO</h3>
              <div className="rounded-lg p-4 border" style={{ borderColor: colors?.textGray || '#aaa' }}>
                <ul className="space-y-2 text-lg" style={{ color: colors?.white || '#fff' }}>
                  <li><a href="#" className="hover:text-gray-300 transition duration-300">Families & children</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition duration-300">Education</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition duration-300">Groups</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition duration-300">A day in Haarlem</a></li>
                  <li><a href="#" className="hover:text-gray-300 transition duration-300">Support us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-auto text-gray-400 text-sm">
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors?.white || '#fff' }}>FRANS HALS MUSEUM</h3>
            <p>Groot Heiligland 62, Haarlem</p>
            <h3 className="text-xl font-semibold mt-4 mb-2" style={{ color: colors?.white || '#fff' }}>LOCATION HAL</h3>
            <p>Grote Markt 16, Haarlem</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
