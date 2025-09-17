import React, { useState, useEffect } from 'react';
import "../../scss/publicProfile.scss"

export function Carousal({ imageUrls, onImageChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (onImageChange) {
      onImageChange(imageUrls[currentIndex]); // Notify parent about the current image
    }
  }, [currentIndex, imageUrls, onImageChange]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {imageUrls && imageUrls.length > 0 ? (
          <div>
            {imageUrls.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={image} className="d-block w-100" alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Carousel Indicators (Dots) */}
      <div className="carousel-indicators">
        {imageUrls.map((_, index) => (
          <button
            type="button"
            key={index}
            data-bs-target="#carouselExampleControls"
            data-bs-slide-to={index}
            className={index === currentIndex ? 'active' : ''}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
        onClick={handlePrevious}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
