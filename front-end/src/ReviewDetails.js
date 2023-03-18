import React, { useState } from 'react';
import './ReviewDetails.css'
import './bootstrap.css'
import { ReactComponent as BackIcon } from "./image/arrow-left.svg";


const ReviewDetails = ({ review }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBackClick = () => {
    setSelectedImage(null);
  };

  return (
    <div className="review-details">
      {selectedImage ? (
        <div className="overlay">
          <button className="back-button" onClick={handleBackClick}>
            <BackIcon />
          </button>
          <img src={selectedImage.url} alt={selectedImage.altText} />
        </div>
      ) : (
        <>
         <button className="back-button btn" onClick={handleBackClick}>
            <BackIcon />
          </button>
          <h2>{review.title}</h2>
          <p className="review-content">{review.content}</p>
          <div className="images-container">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText}
                onClick={() => handleImageClick(image)}
                className="thumbnail"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewDetails;
