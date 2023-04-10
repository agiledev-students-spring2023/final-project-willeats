import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../bootstrap.css'
import TopBar from '../topBar/TopBar';
import './OwnerProfile.css'
import axios from 'axios';

function OwnerProfile() {


  const [userData, setUserData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/getbuisness')
      .then((res) => {
        setUserData(res.data[0])
      })
      .catch((err) => (
        console.log(err)
      ))
  }, []);

  const name = userData.name;
  console.log(userData)
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
    <div>
      <TopBar />
      <div className="owner-profile-container">

        <div className="greeting-bar">
          <h4>Welcome, {name}</h4>
        </div>

        <div className="header-img-container">
          <img src={userData.image} alt="Header" className="header-image" />
        </div>

        <div className="content">
          <div className="owner-profile-image-container">
            <img src={userData.image} alt="Profile" className="profile-image-owners" />
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
        <div className="main-buttons">
          <button className="btn btn-lg btn-outline-primary" onClick={navigateMenu}>Manage Menu</button>
          <button className="btn btn-lg btn-outline-primary" onClick={navigateReview}>View Reviews</button>
          <button className="btn btn-lg btn-outline-primary" onClick={navigateProfile}>Account Settings</button>
        </div>
        <button className="btn btn-link" onClick={navigateHome}>Logout</button>
        
      </div>
    </div>
  );
}

export default OwnerProfile;
