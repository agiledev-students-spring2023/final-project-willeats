import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./ProfileImage.css"

function ProfileImage(props) {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch user's avatar from the database here and set it as the default profile image
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/profile-image-${props.business ? 'M' : 'C'}`);
        setProfileImage(response.data.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileImage();
  }, []);

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
          src={profileImage}
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
