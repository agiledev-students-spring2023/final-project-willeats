import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import './Home.css'
import '../../bootstrap.css'
import logo from "../../image/circle.png";
import backgroundImage from "../../image/food-image.jpg";
import mockProfileImg from "../../image/random-profile.jpg";
import defaultProfileImg from "../../image/default-profile-image.svg";


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [restaurantId,setRestaurantId] = useState( useParams() )
  const profileImage = isLoggedIn ? mockProfileImg : defaultProfileImg;
  const Navigate = useNavigate();
  const {restId} = useParams();
  localStorage.setItem('restId', restId)

  const navigateLogin = () => {
    Navigate('/Login');
  }

  const navigateMenu = () => {
    const restaurantId = localStorage.getItem('restId')
    Navigate(`/getmenu/${restaurantId}`);
  }

  useEffect(() => {
    
  }, []);

  return (
    <div className="container"> 
        <div className="background-container">
            <img src={backgroundImage} alt="Background" className="background-image"/>
        </div>
        <div className="content-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        <div className="profile-container">
          <img src={profileImage} alt="Profile" className="profile" onClick={navigateLogin}/>
        </div>
      
        <div className="button-container">
            <button className="button btn btn-primary btn-lg" onClick={navigateMenu}>Enter Menu</button>
        </div>
        <div className="login-container">
          <button className="btn btn-link" onClick={navigateLogin}>Login</button>
        </div>
        </div>
    </div>
  );
}

export default Home;
