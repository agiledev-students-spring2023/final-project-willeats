import React, { useState } from 'react';
import '../../bootstrap.css';
import './CustomerProfile.css'
import { useNavigate } from 'react-router-dom';
function CustomerProfile() {
  const navigate = useNavigate()
  const [name, setName] = useState('John Doe');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleSaveNameClick = () => {
    setIsEditingName(false);
  };

  const handleCancelNameClick = () => {
    setIsEditingName(false);
  };

  
  const handleEditImageClick = () => {
    setIsEditingImage(true);
  };

  const handleSaveImageClick = () => {
    setIsEditingImage(false);
  };

  const handleCancelImageClick = () => {
    setIsEditingImage(false);
  };

  const navigateOrder = () => {
    navigate('/userpastorder')
  }

  const navigateReview = () => {
    navigate('/userpastreview')
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button class="back"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        </button>
        <button class="home">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
          </svg>
      </button>
      </div>
      <div class="main">
        <div class="profile-image">
          <img src="https://source.unsplash.com/random" alt="Profile pic" style={{ width: '100%', height: '100%' }} />
          
          
        </div>
        {isEditingImage ? (
            <div className="my-profile-image-edit">
              <input type="file" accept="image/*" />
              <button class="btn btn-primary" onClick={handleSaveImageClick}>Save</button>
              <button class="btn btn-primary" onClick={handleCancelImageClick}>Cancel</button>
            </div>
          ) : (
            <button class="btn btn-link" onClick={handleEditImageClick} >Edit Image</button>
          )}

        <div>
          {isEditingName ? (
            <div>
              <input type="text" value={name} onChange={handleNameChange} />
              <button onClick={handleSaveNameClick}>Save</button>
              <button onClick={handleCancelNameClick}>Cancel</button>
            </div>
          ) : (
            <div class="name">
              <h2>{name}</h2>
              <button type="button" class="btn btn-link" onClick={handleEditNameClick}>Edit Name</button>
            </div>
          )}
        </div>
        <div class="d-grid gap-2">
          <button type="button" class="btn btn-lg btn-outline-primary" onClick={navigateOrder}>My Orders</button>
          <button type="button" class="btn btn-lg btn-outline-primary" onClick={navigateReview}>My Reviews</button>
          <button type="button" class="btn btn-lg btn-outline-primary">Account Settings</button>
        </div>
        <button class="btn btn-link logout" >Logout</button>
      </div>
    </div>
  );
}

export default CustomerProfile;
