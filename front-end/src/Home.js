import React, { useState } from "react";

import './Home.css'
import './bootstrap.css'
import logo from "./image/circle.png";
import backgroundImage from "./image/food-image.jpg";
import mockProfileImg from "./image/random-profile.jpg";
import defaultProfileImg from "./image/default-profile-image.svg";
import { useNavigate } from "react-router-dom";


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileImage = isLoggedIn ? mockProfileImg : defaultProfileImg;
  const loginText = isLoggedIn ? "Log Out" : "Log In";

  const Navigate = useNavigate()

  const handleLoginClick = () => {
    Navigate('/CP')
  }

  

  return (
    <div className="container"> 
        <div className="background-container">
            <img src={backgroundImage} alt="Background" className="background-image" />
        </div>
        <div className="content-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        <div className="profile-container">
        <img src={profileImage} alt="Profile" className="profile" />
        </div>
      
        <div className="button-container">
            <button className="button btn btn-primary btn-lg">Scan Now</button>
        </div>
        <div className="login-container">
            
        </div>
        </div>
    </div>
  );
}

export default Home;
