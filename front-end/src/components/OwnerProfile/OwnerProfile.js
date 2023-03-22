import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.css'
import './OwnerProfile.css'

function OwnerProfile() {
  const name = useState('Peet\'s coffee and tea');
  const navigate = useNavigate()

  const navigateProfile = () => {
    navigate('/Profile-M')
  }

  const navigateHome = () => {
    navigate('/')
  }

  const navigateMenu = () => {
    navigate('/editmenu')
  }

  const navigateReview = () => {
    navigate('/replymenu')
  }

  return (
    <div className="owner-profile-container">
        
        <div className="greeting-bar">
          <h4>Welcome, {name}</h4>
        </div>

        <div className="header-img-container">
          <img src="https://source.unsplash.com/random" alt="Header" className="header-image" />
      </div>

      <div className="content">
        <div className="owner-profile-image-container">
          <img src="https://source.unsplash.com/random" alt="Profile" className="profile-image-owners" />
        </div>
        <div className="name-container">    
            <div className="name">
              <h2 className="name-text">{name}</h2>
            </div>
        </div>
        <div className="main-buttons">
          <button className="btn btn-lg btn-outline-primary" onClick={navigateMenu}>Manage Menus</button>
          <button className="btn btn-lg btn-outline-primary" onClick={navigateReview}>Manage Reviews</button>
          <button className="btn btn-lg btn-outline-primary" onClick={navigateProfile}>Account Settings</button>
        </div>
        <button className="btn btn-link" onClick={navigateHome}>Logout</button>
      </div>
    </div>
  );
}

export default OwnerProfile;
