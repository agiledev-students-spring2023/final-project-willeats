import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.css'
import './OwnerProfile.css'

function OwnerProfile() {
  const [name, setName] = useState('Peet\'s coffee and tea');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditingHeaderImage, setIsEditingHeaderImage] = useState(false);
  const navigate = useNavigate()

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

  const handleEditHeaderImageClick = () => {
    setIsEditingHeaderImage(true);
  };

  const handleSaveHeaderImageClick = () => {
    setIsEditingHeaderImage(false);
  };

  const handleCancelHeaderImageClick = () => {
    setIsEditingHeaderImage(false);
  };

  const navigateProfile = () => {
    navigate('/Profile-M')
  }

  return (
    <div class="profile-container">
        
        <div class="greeting-bar">
          <h4>Welcome, {name}</h4>
        </div>

        <div class="header-img-container">
          <img src="https://source.unsplash.com/random" alt="Header" class="header-image" />
          {isEditingHeaderImage ? (
            <div class="header-image-edit">
              <input type="file" accept="image/*" />
              <button onClick={handleSaveHeaderImageClick} class="btn btn-primary save-button">Save</button>
              <button onClick={handleCancelHeaderImageClick} class="btn btn-primary cancel-button">Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditHeaderImageClick} class="edit-button">Edit Header Image</button>
          )}

      </div>
      <div class="content">
        <div class="profile-image-container">
          <img src="https://source.unsplash.com/random" alt="Profile" class="profile-image" />
          
        </div>
        {isEditingImage ? (
            <div class="image-edit">
              <input type="file" accept="image/*" />
              <button onClick={handleSaveImageClick} class="btn btn-primary image-save-button">Save</button>
              <button onClick={handleCancelImageClick} class="btn btn-primary image-cancel-button">Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditImageClick} class="edit-button">Edit Logo</button>
          )}
        <div class="name-container">
          {isEditingName ? (
            <div class="name-edit">
              <input type="text" value={name} onChange={handleNameChange} class="name-input" />
              <button onClick={handleSaveNameClick} class="btn btn-primary save-button">Save</button>
              <button onClick={handleCancelNameClick} class="btn btn-primary cancel-button">Cancel</button>
              </div>
            ) : (
            <div class="name">
              <h2 class="name-text">{name}</h2>
              <button onClick={handleEditNameClick} class="edit-button">Edit Name</button>
            </div>
          )}
        </div>
        <div class="main-buttons">
          <button  class="btn btn-lg btn-outline-primary">Manage Menus</button>
          <button class="btn btn-lg btn-outline-primary">Manage Reviews</button>
          <button class="btn btn-lg btn-outline-primary" onClick={navigateProfile}>Account Settings</button>
        </div>
        <button class="btn btn-link" >Logout</button>
      </div>
    </div>
  );
}

export default OwnerProfile;
