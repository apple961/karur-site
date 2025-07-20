import React from 'react';
import welcomeImage from '../assets/images/WelcomeSection.jpg';

const WelcomeSection = ({ colors }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: colors.lightBeige }}>
      <div className="max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center justify-center">
        {/* Image Container - positioned slightly to the left and rounded */}
        <div className="lg:w-[70%] w-full rounded-2xl overflow-hidden shadow-lg transform lg:-translate-x-[15%] z-0" style={{ borderRadius: '1.5rem' }}>
          <img src={welcomeImage} alt="Museum Interior" className="w-full h-full object-cover" style={{ borderRadius: '1.5rem' }} />
        </div>

        {/* Text Box Container - positioned to overlap and rounded */}
        <div className="lg:w-[55%] w-full p-8 rounded-2xl shadow-lg lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-[10%] z-10"
          style={{ backgroundColor: colors.darkBackground, color: colors.white, borderRadius: '1.5rem' }}>
          <h2 className="text-4xl font-bold mb-6" style={{ color: colors.white }}>WELCOME TO THE FRANS HALS MUSEUM</h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: colors.textGray }}>
            The Frans Hals Museum is Haarlem's museum of fine arts. It houses the largest collection of Frans Hals
            paintings in the world, as well as works by other famous artists from Haarlem such as Judith Leyster, Cornelis
            van Haarlem and Jacob van Ruisdael. You'll also
            discover an extensive collection of art from 1880 to the
            present day, including works by Isaac Israëls, Charley
            Toorop and Dana Lixenberg.
          </p>
          <p className="text-lg leading-relaxed mb-8" style={{ color: colors.textGray }}>
            Discover 16th - and 17th-century, modern and
            contemporary art in two beautiful historical buildings in
            the old city centre.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 rounded-full font-bold text-lg transition duration-300"
              style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground }}>
              PLAN YOUR VISIT
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg transition duration-300"
              style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground }}>
              ABOUT OUR MUSEUM
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
