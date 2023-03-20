import React, { useState } from 'react';
import "./ProfileImage.css"

function ProfileImage() {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-image-container">
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
      <input
        type="file"
        accept="image/*"
        id="profile-image-input"
        className="profile-image-input"
        onChange={handleProfileImageChange}
      />
    </div>
  );
}

export default ProfileImage;