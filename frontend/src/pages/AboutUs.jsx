import React from 'react';
import StoryCard from '../components/about/StoryCard';
import './AboutUs.css';
// QUAN TRỌNG: Gọi file Header và Footer vào đây
import Header from '../components/common/Header'; 
import Footer from '../components/common/Footer';

const AboutUs = () => {
  const stories = [
    { id: 1, title: 'Story', description: 'Our story is vvvv...', image: '' },
    { id: 2, title: 'Story', description: 'Our story is vvvv...', image: '' },
    { id: 3, title: 'Story', description: 'Our story is vvvv...', image: '' },
    { id: 4, title: 'Story', description: 'Our story is vvvv...', image: '' },
  ];

  return (
    <div className="page-wrapper">
      {/* Lắp Header lên đầu trang */}
      <Header />
      
      <div className="about-us-container">
        <h1 className="page-title">ABOUT US</h1>
        <div className="stories-grid">
          {stories.map((story) => (
            <StoryCard 
              key={story.id}
              title={story.title}
              description={story.description}
            />
          ))}
        </div>
      </div>

      {/* Lắp Footer xuống cuối trang */}
      <Footer />
    </div>
  );
};

export default AboutUs;