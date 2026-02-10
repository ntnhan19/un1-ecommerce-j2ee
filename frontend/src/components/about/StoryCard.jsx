import React from 'react';

const StoryCard = ({ title, description, image }) => {
  return (
    <div className="story-card bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StoryCard;