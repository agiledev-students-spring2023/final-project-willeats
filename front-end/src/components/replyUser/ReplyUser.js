import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../bootstrap.css';
import axios from 'axios';
import TopBar_profile from '../topBar/TopBar-profile';
import './ReplyUser.css';
import StarRatings from 'react-star-ratings'
//the avatar has to be added so that the restImage can be set, now it is hard code
const ReplyUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [review, setReview] = useState(new URLSearchParams(location.search).get('review'));
    const [reviewImages, setReviewImages] = useState(new URLSearchParams(location.search).getAll('image'));
    const [mainName, setMainName] = useState(new URLSearchParams(location.search).get('mainName'));
    const [itemName, setItemName] = useState(new URLSearchParams(location.search).get('itemName'));
    const [star, setStar] = useState(new URLSearchParams(location.search).get('star'));
    const [date, setDate] = useState(new URLSearchParams(location.search).get('date'));
    const [id, setId] = useState(new URLSearchParams(location.search).get('id'));
    const [selectedImage, setSelectedImage] = useState(null);
    const [reply, setReply] = useState('');

    const handleClick = () => {
        // Send the reply text to the backend
        axios.post('http://localhost:3001/api/sendReply', { reviewId: id, replyText: reply })
          .then(response => {
            console.log(response.data);
            // If the backend responds with a success message, navigate back to the review page
            navigate(-1);
          })
          .catch(error => {
            console.log(error);
          });
      };
  
    return (
      <div className="review-details">
        <TopBar_profile />
  
        <div className="review-header">
          <img className="profile-image" src={'https://willeats-bucket.s3.us-east-1.amazonaws.com/1682464242588-circle.png'} alt="Reviewer profile" />
          <div className="review-info">
            <h5>{mainName}</h5>
            <div className="rating">
              <StarRatings 
                rating={parseFloat(star)}
                starDimension="18px"
                starSpacing="2px"
              />
            </div>
            <p className="date">{date}</p>
          </div>
        </div>
  
        <p className="review-content">{review}</p>
        <div className="review-reply-container">
        <h2>Write Reply To {mainName} ...</h2>
        <textarea
        className="form-control"
        id="reply"
        rows="12"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
            ></textarea>
        </div>
        <button type="submit" className="submit" onClick={handleClick}>
            Submit Reply
        </button>
      </div>
    );
  };
  

export default ReplyUser;

