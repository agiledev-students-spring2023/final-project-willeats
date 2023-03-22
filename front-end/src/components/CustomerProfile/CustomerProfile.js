import React, { useState } from 'react';
import '../../bootstrap.css';
import './CustomerProfile.css'
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/TopBar';
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
  
  const navigateAccount = () => {
    navigate('/Profile-C')
  }
  
  const navigateHome = () => {
    navigate('/')
  }

  return (
    <div>
      <TopBar/>
      <div className="main">
        <div className="profile-image">
          <img src="https://source.unsplash.com/random" alt="Profile pic" style={{ width: '100%', height: '100%' }} />
          
          
        </div>
        {isEditingImage ? (
            <div className="my-profile-image-edit">
              <input type="file" accept="image/*" />
              <button className="btn btn-primary" onClick={handleSaveImageClick}>Save</button>
              <button className="btn btn-primary" onClick={handleCancelImageClick}>Cancel</button>
            </div>
          ) : (
            <button className="btn btn-link" onClick={handleEditImageClick} >Edit Image</button>
          )}

        <div>
          {isEditingName ? (
            <div>
              <input type="text" value={name} onChange={handleNameChange} />
              <button onClick={handleSaveNameClick}>Save</button>
              <button onClick={handleCancelNameClick}>Cancel</button>
            </div>
          ) : (
            <div className="name">
              <h2>{name}</h2>
              <button type="button" className="btn btn-link" onClick={handleEditNameClick}>Edit Name</button>
            </div>
          )}
        </div>
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateOrder}>My Orders</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateReview}>My Reviews</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateAccount}>Account Settings</button>
        </div>
        <button className="btn btn-link logout" onClick={navigateHome}>Logout</button>
      </div>
    </div>
  );
}

export default CustomerProfile;
