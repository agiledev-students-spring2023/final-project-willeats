import React, { useState } from 'react';
import axios from 'axios';
import "./ProfileImage.css"

function ProfileImage(props) {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await axios.post(`http://localhost:3001/profile-image-${props.business ? 'M' : 'C'}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfileImage(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-image-container-login">
      <div className="profile-image" onClick={() => document.getElementById("profile-image-input").click()}>
        <img
          src={profileImage || 'https://picsum.photos/200/300'}
          alt="Profile"
          className="rounded-circle"
        />
        <div className="profile-image-overlay">
          <span className="profile-image-text">Change Profile</span>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="file"
        accept="image/*"
        id="profile-image-input"
        className="profile-image-input"
        onChange={handleProfileImageChange}
      />
      </form>
    </div>
  );
}

export default ProfileImage;
