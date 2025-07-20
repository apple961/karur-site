import React from 'react';
import HomePage from './pages/HomePage.jsx';

// Define global colors for consistent use across components
export const colors = {
  darkBackground: '#1A202C', // Very dark blue/black
  lightBeige: '#EEDDBC',    // Warm light beige from the site
  darkGreen: '#556B2F',     // Olive green from the news section
  primaryBlue: '#007BFF',   // A standard blue, can be adjusted
  hoverBlue: '#0056b3',     // Darker blue for hover states
  buttonBeige: '#EEDDBC',   // Beige for specific buttons
  buttonDark: '#1A202C',    // Dark for specific buttons
  textGray: '#A0AEC0',      // Lighter gray for text on dark backgrounds
  white: '#FFFFFF',
  headerMenuIcon: '#FFFFFF', // Color for the menu icon in the header
};

const App = () => {
  return (
    <div className="font-inter antialiased text-gray-900">
      {/* Tailwind CSS CDN - typically loaded in index.html or via build process */}
      {/* For this Canvas environment, we keep it here for direct execution */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Font for the entire page */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Render the HomePage component */}
      <HomePage />
    </div>
  );
};

export default App;
