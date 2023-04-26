import React, { useState, useEffect } from 'react';
import '../../bootstrap.css'
import './ReviewDetails.css'
import axios from 'axios';

import { ReactComponent as BackIcon } from "../../image/arrow-left.svg";
import { ReactComponent as Star } from '../../image/star-fill.svg';
import TopBar from '../topBar/TopBar';


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

const ReviewDetails = () => {

  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/userpastreview')
      .then((res) => {
        setReviewData(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBackClick = () => {
    setSelectedImage(null);
  };

  const starsArray = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="review-details">


      {selectedImage ? (
        
        <div className="overlay">
            <button className="back-button" onClick={handleBackClick}>
            <BackIcon />
          </button>
           <img src={selectedImage} />
        </div>
      ) : (
        <>      <TopBar />

          <div className="review-header">
            
            <img className="profile-image" src={reviewData.restImage} alt="Reviewer profile" />
            <div className="review-info">
              <h5>{reviewData.name}</h5>

              <div className="rating">
                {starsArray.map((star) => {
                  const starType = star <= (reviewData.star || 0) ? 'fill' : 'empty';
                  return <Star key={star} fill={starType === 'fill' ? '#e95420' : 'gray'} className="star-icon" />;
                })}
              </div>

              <p className="date">{reviewData.date}</p>
            </div>
          </div>
          <p className="review-content">{reviewData.review}</p>
          <div className="review-images-container">
            {reviewData.reviewImage && reviewData.reviewImage.length > 0 ? (
              <ul>
                {reviewData.reviewImage.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={image.altText}
                    onClick={() => handleImageClick(image)}
                    className="thumbnail"
                  />
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewDetails;
