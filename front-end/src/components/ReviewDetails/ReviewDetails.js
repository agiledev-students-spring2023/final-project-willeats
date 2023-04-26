import React, { useState, useEffect } from 'react';
import '../../bootstrap.css'
import './ReviewDetails.css'
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ReactComponent as BackIcon } from "../../image/arrow-left.svg";
import { ReactComponent as Star } from '../../image/star-fill.svg';
import TopBar from '../topBar/TopBar';
import StarRatings from 'react-star-ratings'


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
  const navigate = useNavigate();
  const location = useLocation();
  const [reviewData, setReviewData] = useState([]);
  const [review, setReview]=useState(new URLSearchParams(location.search).get('review'))
  const [reviewImages, setReviewImages]=useState(new URLSearchParams(location.search).getAll('image'))
  const [mainName, setMainName]=useState(new URLSearchParams(location.search).get('mainName'))
  const [itemName, setItemName]=useState(new URLSearchParams(location.search).get('itemName'))
  const [star, setStar]=useState(new URLSearchParams(location.search).get('star'))
  const [date, setDate]=useState(new URLSearchParams(location.search).get('date'))
  const [id, setId]=useState(new URLSearchParams(location.search).get('id'))
  const [reply, setReply] = useState('')

  useEffect(() => {
    // Send a GET request to retrieve the review document using its ID
    axios.get(`http://localhost:3001/getReviewById/${id}`)
      .then(response => {
        // console.log(response.data.reply)
        setReply(response.data.reply)
      })
      .catch(error => {
        console.log(error);
      });
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
            
            <img className="profile-image" src={'https://willeats-bucket.s3.us-east-1.amazonaws.com/1682464242588-circle.png'} alt="Reviewer profile" />
            <div className="review-info">
              <h5>{mainName}</h5>

              <div className="rating">
              <StarRatings 
              rating={parseFloat(star)}
              starDimension="18px"
              starSpacing="2px"/>
              </div>

              <p className="date">{date}</p>
            </div>
          </div>
          
          <p className="review-content">{review}</p>
         
          <div className="review-images-container">
            {reviewImages && reviewImages.length > 0 ? (
              <ul>
                {reviewImages.map((image, index) => (
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
            <div className='reply'>
            <h4>Reply from the Restaurant:</h4>
            <p>{reply ? reply : 'The restaurant has not replied yet.'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewDetails;
