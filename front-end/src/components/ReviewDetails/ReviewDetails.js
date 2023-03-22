import React, { useState } from 'react';
import '../../bootstrap.css'
import './ReviewDetails.css'

import { ReactComponent as BackIcon } from "../../image/arrow-left.svg";
import { ReactComponent as Star } from '../../image/star-fill.svg';

const StarFill = () => {
    return (
        <Star fill="#e95420" />
    );
  };

const StarEmpty = () => {
    return (
        <Star fill="gray" />
    );
  };

const ReviewDetails = ({ review, user }) => {
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
         <div className="review-header">
            <button className="back-button btn" onClick={handleBackClick}>
            <BackIcon />
          </button>
            <img className="profile-image" src={user.profileImage} alt="Reviewer profile" />
            <div className="review-info">
            <h5>{user.name}</h5>
            <div className="rating">
                {[...Array(review.rating)].map((_, index) => (
                <StarFill key={index} className="star-icon" />
                ))}
                {[...Array(5-review.rating)].map((_, index) => (
                <StarEmpty key={index} className="star-icon" />
                ))}
                
            </div>
            <p className="date">{review.date}</p>
        </div>
      </div>
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
