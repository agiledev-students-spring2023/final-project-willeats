import React, { useState } from "react";
import '../../bootstrap.css'
import backgroundImage from "../../image/food-image.jpg";

import mockProfileImg from "../../image/random-profile.jpg";
import defaultProfileImg from "../../image/default-profile-image.svg";
import { useNavigate } from "react-router-dom";
import './OrderFinished.css'

function OrderFinished() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const profileImage = isLoggedIn ? mockProfileImg : defaultProfileImg;

  return (

    <div class="orderfinished-container"> 
        <div class="background-container">
            <img src={backgroundImage} alt="Background" class="background-image" />
        </div>
        <div className="content-container">
            <h4 class="confirm-text"><strong>Order Placed. <br /> Get Prepared to Eat!</strong></h4>
            <div className="profile-container">
            <img src={profileImage} alt="Profile" className="profile" />
            </div>

            <div className="button-container">
                <button className="button btn btn-primary btn-lg">View Receipt</button>
                <button className="button btn btn-primary btn-lg">Order More</button>
                <button className="button btn btn-primary btn-lg">Write Reviews</button>
            </div>
        </div>
    </div>

  );
}


export default OrderFinished;