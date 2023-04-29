import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // Import the QRCode component
import '../../bootstrap.css';
import TopBar from '../topBar/TopBar';
import './OwnerProfile.css';
import axios from 'axios';

function OwnerProfile() {

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/getbuisness')
      .then((res) => {
        setUserData(res.data)
      })
      .catch((err) => (
        console.log(err)
      ))
  }, []);

  const name = userData.name;
  const id = userData._id; // Extract the user's ID from the userData object
  console.log(userData);
  const navigate = useNavigate();

  const navigateProfile = () => {
    navigate('/Profile-M');
  }

  const navigateHome = () => {
    navigate('/');
  }

  const navigateMenu = () => {
    navigate('/editmenu');
  }

  const navigateReview = () => {
    navigate('/replymenu');
  }

  const navigateQRCode = () => {
    navigate(`/qr-code/${id}`); // navigate to the QRCodeGenerator component with the user ID as a parameter
  }

  const navigateRestaurantOrder = ()=>{
     navigate(`/restaurant-order/${id}`)
  }

  return (
    <div>
      <TopBar />
      <div className="owner-profile-container">

        <div className="greeting-bar">
          <h4>Welcome, {name}</h4>
        </div>

        <div className="header-img-container">
          <img src={userData.background} alt="Header" className="header-image" />
        </div>

        <div className="content">
          <div className="owner-profile-image-container">
            <img src={userData.avatar} alt="Profile" className="profile-image-owners" />
          </div>
          <div className="name-container">
            <div className="name">
              <h2 className="name-text">{name}</h2>
            </div>
          </div>
          <div className="main-buttons">
             <button className="btn btn-lg btn-outline-primary" onClick={navigateRestaurantOrder}>Restaurant's Order</button>
            <button className="btn btn-lg btn-outline-primary" onClick={navigateMenu}>Manage Menu</button>
            <button className="btn btn-lg btn-outline-primary" onClick={navigateReview}>View Reviews</button>
            <button className="btn btn-lg btn-outline-primary" onClick={navigateProfile}>Account Settings</button>
            <button className="btn btn-lg btn-outline-primary" onClick={navigateQRCode}>Access QR code</button>
            
          </div>
          <button className="btn btn-link" onClick={navigateHome}>Logout</button>
        </div>
        
      </div>
    </div>
  );
}

export default OwnerProfile;
