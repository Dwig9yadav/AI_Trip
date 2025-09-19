
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-500"></div>
    <p className="text-lg text-gray-300">Crafting your perfect itinerary...</p>
  </div>
);

export default LoadingSpinner;
