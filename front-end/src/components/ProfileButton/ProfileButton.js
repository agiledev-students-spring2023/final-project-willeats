import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../bootstrap.css';
import './ProfileButton.css';

function ProfileButton() {
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAvatar();
  }, []);

  const fetchAvatar = async () => {
    try {
      const response = await axios.get('http://localhost:3001/topbar-avatar', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch user avatar');
      }

      const { role, avatar } = response.data;
      setRole(role);
      setAvatar(avatar);
    } catch (error) {
      console.error(error);
      // Handle error appropriately (e.g., show a default avatar)
    }
  };

  const getProfilePath = () => {
    // Determine profile path based on user role
    if (role === 'manager') {
      return '/ownerprofile';
    } else {
      return '/customerprofile';
    }
  };

  const navigateProfile = () => {
    const profilePath = getProfilePath(); // Determine profile path based on user role
    navigate(profilePath);
  };

  return (
    <button className="btn profile-button m-1" onClick={navigateProfile}>
      <div className="rounded-circle image-container">
        <img src={avatar} alt="Profile" className="rounded-circle" />
      </div>
    </button>
  );
}

export default ProfileButton;
