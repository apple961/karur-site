import React from 'react';

const Card = ({ imageSrc, altText, subTitle, title, colors }) => {
  return (
    <div className="flex-none w-80 md:w-96 rounded-lg shadow-lg overflow-hidden relative" style={{ backgroundColor: colors.darkBackground, borderRadius: '1.5rem' }}>
      <img src={imageSrc} alt={altText} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white">
        <p className="text-sm font-light">{subTitle}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
