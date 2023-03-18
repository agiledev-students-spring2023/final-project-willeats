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
    <div>
      <div className="profile-image" style={{ textAlign: 'center' }}>
        <img
          src={profileImage || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="rounded-circle"
        />
        <div style={{ marginTop: '10px' }}>
          <input
            type="file"
            accept="image/*"
            className="d-flex justify-content-center"
            onChange={handleProfileImageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;