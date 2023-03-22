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
    <div className="owner-profile-container">
        
        <div className="greeting-bar">
          <h4>Welcome, {name}</h4>
        </div>

        <div className="header-img-container">
          <img src="https://source.unsplash.com/random" alt="Header" className="header-image" />
          {isEditingHeaderImage ? (
            <div className="header-image-edit">
              <input type="file" accept="image/*" />
              <button onClick={handleSaveHeaderImageClick} className="btn btn-primary save-button">Save</button>
              <button onClick={handleCancelHeaderImageClick} className="btn btn-primary cancel-button">Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditHeaderImageClick} className="edit-button">Edit Header Image</button>
          )}

      </div>

      <div className="content">
        <div className="owner-profile-image-container">
          <img src="https://source.unsplash.com/random" alt="Profile" className="profile-image-owners" />
        </div>
        {isEditingImage ? (
            <div className="image-edit">
              <input type="file" accept="image/*" />
              <button onClick={handleSaveImageClick} className="btn btn-primary image-save-button">Save</button>
              <button onClick={handleCancelImageClick} className="btn btn-primary image-cancel-button">Cancel</button>
            </div>
          ) : (
            <button onClick={handleEditImageClick} className="edit-button">Edit Logo</button>
          )}
        <div className="name-container">
          {isEditingName ? (
            <div className="name-edit">
              <input type="text" value={name} onChange={handleNameChange} className="name-input" />
              <button onClick={handleSaveNameClick} className="btn btn-primary save-button">Save</button>
              <button onClick={handleCancelNameClick} className="btn btn-primary cancel-button">Cancel</button>
              </div>
            ) : (
            <div className="name">
              <h2 className="name-text">{name}</h2>
              <button onClick={handleEditNameClick} className="edit-button">Edit Name</button>
            </div>
          )}
        </div>
        <div className="main-buttons">
          <button  className="btn btn-lg btn-outline-primary">Manage Menus</button>
          <button className="btn btn-lg btn-outline-primary">Manage Reviews</button>
          <button className="btn btn-lg btn-outline-primary" onClick={navigateProfile}>Account Settings</button>
        </div>
        <button className="btn btn-link" >Logout</button>
      </div>
    </div>
  );
}

export default OwnerProfile;
