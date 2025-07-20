import React, { useRef } from 'react';
import Card from './Card.jsx';
import { colors } from '../App.jsx'; // Import colors

const HighlightsSection = () => {
  const highlightsRef = useRef(null);

  const scrollHorizontally = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 350;
      if (direction === 'left') {
        ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const highlightData = [
    {
      imageSrc: "https://placehold.co/400x300/EEDDBC/1A202C?text=Highlight+1",
      altText: "Highlight 1",
      subTitle: "LEO GESTEL (WOERDEN, 1881 – HILVERSUM, 1941)",
      title: "Woman in a Large Hat in a Summer House"
    },
    {
      imageSrc: "https://placehold.co/400x300/EEDDBC/1A202C?text=Highlight+2",
      altText: "Highlight 2",
      subTitle: "FRANS HALS (ANTWERPEN, 1582/83 – HAARLEM, 1666)",
      title: "Regentesses of the Old Men's Alms House"
    },
    {
      imageSrc: "https://placehold.co/400x300/EEDDBC/1A202C?text=Highlight+3",
      altText: "Highlight 3",
      subTitle: "ISAAC ISRAELS (AMSTERDAM, 1865 – DEN HAAG, 1934)",
      title: "Portrait of Mankunegara VII, a Javanese Ruler"
    },
    {
      imageSrc: "https://placehold.co/400x300/EEDDBC/1A202C?text=Highlight+4",
      altText: "Highlight 4",
      subTitle: "WILLEM CLAESZ HEDA (HAARLEM, 1594 – HAARLEM, 1680)",
      title: "Still Life with half-eaten Pie"
    },
    {
      imageSrc: "https://placehold.co/400x300/EEDDBC/1A202C?text=Highlight+5",
      altText: "Highlight 5",
      subTitle: "UNKNOWN ARTIST",
      title: "Another Masterpiece"
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: colors.lightBeige }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold" style={{ color: colors.darkBackground }}>OUR HIGHLIGHTS</h2>
          <button className="px-6 py-2 rounded-full font-bold text-sm transition duration-300"
            style={{ backgroundColor: colors.buttonBeige, color: colors.darkBackground, border: `1px solid ${colors.darkBackground}` }}>
            DISCOVER OUR COLLECTION
          </button>
        </div>
        {/* Horizontal Scroll Container */}
        <div ref={highlightsRef} className="flex overflow-x-auto pb-4 scrollbar-hide space-x-8 -mx-4 px-4">
          {highlightData.map((data, index) => (
            <Card key={index} {...data} colors={colors} />
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={() => scrollHorizontally(highlightsRef, 'left')} className="p-3 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition duration-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button onClick={() => scrollHorizontally(highlightsRef, 'right')} className="p-3 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-200 transition duration-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
