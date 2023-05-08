import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Home.css'
import '../../bootstrap.css'
import logo from "../../image/circle.png";
import backgroundImage from "../../image/food-image.jpg";
import ProfileButton from "../ProfileButton/ProfileButton"


function Home() {
  const Navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"))

  const { restId } = useParams();
  localStorage.setItem('restId', restId)

  const handleLog = () => {
    if (token) {
      setToken(null);
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      Navigate('/Login');
    }
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
        <img src={backgroundImage} alt="Background" className="background-image" />
      </div>
      <div className="content-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="profile-container">
          <ProfileButton />
        </div>

        <div className="button-container">
          <button className="button btn btn-primary btn-lg" onClick={navigateMenu}>Enter Menu</button>
        </div>
        <div className="login-container">
          <button className="btn btn-link" onClick={handleLog}>
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
