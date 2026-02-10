import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/product-showcase.css";

const ProductShowcase = () => {
  const showcases = [
    {
      id: 1,
      title: "ABOUT US",
      //image: '/src/assets/images/showcase-1.jpg',
      link: "/about",
    },
    {
      id: 2,
      title: "CONTACT US",
      //image: '/src/assets/images/showcase-2.jpg',
      link: "/contact",
    },
  ];

  return (
    <section className="product-showcase">
      <div className="showcase-container">
        {showcases.map((item) => (
          <div key={item.id} className="showcase-item">
            {/*<div className="showcase-image">
              <img src={item.image} alt={item.title} />
            </div>*/}
            <div className="showcase-overlay">
              <h3 className="showcase-title">{item.title}</h3>
              <Link to={item.link} className="showcase-button">
                {item.title.split(" ")[0]}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
