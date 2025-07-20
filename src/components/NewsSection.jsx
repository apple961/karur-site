import React, { useRef } from 'react';
import Card from './Card.jsx';
import { colors } from '../App.jsx'; // Import colors

const NewsSection = () => {
  const newsRef = useRef(null);

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

  const newsData = [
    {
      imageSrc: "https://placehold.co/400x300/556B2F/FFFFFF?text=News+1",
      altText: "News 1",
      subTitle: "19 September 2024",
      title: "NEW ADDITION: THE HOLDER (2023) BY SUSANNA INGLADA"
    },
    {
      imageSrc: "https://placehold.co/400x300/556B2F/FFFFFF?text=News+2",
      altText: "News 2",
      subTitle: "29 August 2024",
      title: "MAARTEN VAN HEEMSKERCK'S STRONG MEN SERIES DISPLAYED AS ORIGINALLY INTENDED FOR FIRST TIME IN THE NETHERLANDS"
    },
    {
      imageSrc: "https://placehold.co/400x300/556B2F/FFFFFF?text=News+3",
      altText: "News 3",
      subTitle: "26 July 2024",
      title: "LOAN STOP"
    },
    {
      imageSrc: "https://placehold.co/400x300/556B2F/FFFFFF?text=News+4",
      altText: "News 4",
      subTitle: "17 June 2024",
      title: "HOMECOMING OF MASTERPIECES"
    },
    {
      imageSrc: "https://placehold.co/400x300/556B2F/FFFFFF?text=News+5",
      altText: "News 5",
      subTitle: "10 June 2024",
      title: "NEW EXHIBITION ANNOUNCEMENT"
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor: colors.darkGreen }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-white">NEWS</h2>
          <button className="px-6 py-2 rounded-full font-bold text-sm transition duration-300"
            style={{ backgroundColor: colors.darkGreen, color: colors.white, border: `1px solid ${colors.white}` }}>
            VIEW ALL NEWS
          </button>
        </div>
        {/* Horizontal Scroll Container */}
        <div ref={newsRef} className="flex overflow-x-auto pb-4 scrollbar-hide space-x-8 -mx-4 px-4">
          {newsData.map((data, index) => (
            <Card key={index} {...data} colors={colors} />
          ))}
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={() => scrollHorizontally(newsRef, 'left')} className="p-3 rounded-full border border-white text-white hover:bg-white hover:text-darkGreen transition duration-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button onClick={() => scrollHorizontally(newsRef, 'right')} className="p-3 rounded-full border border-white text-white hover:bg-white hover:text-darkGreen transition duration-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
