import React from 'react';

const StoryCard = ({ title, description, image }) => {
  return (
    <div className="story-card">
      {image ? (
        <img src={image} alt={title} className="story-card-image" />
      ) : (
        <div className="story-card-image">📖</div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default StoryCard;
