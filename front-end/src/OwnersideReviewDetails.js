import React, { useState } from 'react';
import './bootstrap.css'
import './ReviewDetails.css'
import './OwnersideReviewDetails.css'
import ReviewDetails from './ReviewDetails';



const OwnersideReviewDetails = ({ review, user, owner }) => {
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
      };
    
      const handleChange = (event) => {
        setComment(event.target.value);
      };

      
    function handleEdit() {
      setSubmitted(false);
      setComment(review.comment);
    }

    function handleDelete() {
      setComment("");
      setSubmitted(false);
    }

    const renderComment = () => {
        return (
            <div class="reply-box">
                <div className="comment">
                    <div class="comment-header">
                    
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                        </svg>
                        <h5> Reply from the owner</h5>
                        
                    </div>
                    <div class="comment-header">
                
                        <img className="profile-image" src={owner.profileImage} alt="Reviewer profile" />
                        <div className="review-info">
                            <h5>{owner.name}</h5>
                            <div class="comment-actions">
                                <button class="btn btn-link" onClick={handleEdit}>Edit</button>
                                <button class="btn btn-link" onClick={handleDelete}>Delete</button>
                            </div>
                            
                        </div>
                </div>
                <div className="comment-actions">
                <p>{review.comment}</p>
                
                </div>
            </div>
          </div>
          
        );
      };
    
      const renderForm = () => {
        return (
            <div>
            <div class="reply-box">
            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
            </svg>
            <div class="reply-details">
                <h4>Write a reply to...</h4>
                <h5>{user.name}</h5>
            </div>
           </div>
        <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your comment here"
          value={comment}
          onChange={handleChange}
          
          class="form-control" rows="15"
        />
        <button class="btn btn-primary btn-lg submit-comment" type="submit">Submit</button>
      </form>

      </div>

        );
      };



  return (
    <div className="review-details">
        < ReviewDetails review={review} user={user} />        
        
        {submitted ? renderComment() : renderForm()}

    </div>
  );
};

export default OwnersideReviewDetails;
