import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import '../../bootstrap.css';
import './ProfileButton.css';

function ProfileButton() {
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const [path, setPath] = useState('')
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"))
  useEffect(() => {
    fetchAvatar();
    // navigateProfile();
  }, []);

  const fetchAvatar = async () => {
    try {
      const response = await axios.get('/topbar-avatar', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch user avatar');
      }

      const { role, avatar } = response.data;
      setRole(role);
      setAvatar(avatar);
      if (role === 'manager') {
        setPath('/ownerprofile');
      } else {
        setPath('/customerprofile');
      }
    } catch (error) {
      console.error(error);
      setAvatar('https://willeats-bucket.s3.amazonaws.com/guest.jpg');
      console.log(avatar)
      // Handle error appropriately (e.g., show a default avatar)
    }
  };

  const getProfilePath = () => {
    console.log(role)
    // Determine profile path based on user role
    if (role === 'manager') {
      setPath('/ownerprofile');
    } else {
      setPath('/customerprofile');
    }
  };

  const navigateProfile = () => {
    if (token) {
      console.log(token)
      // const profilePath = getProfilePath(); 
      console.log(path)// Determine profile path based on user role
      navigate(path);
    } else {
      navigate('/Login');
    }
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
