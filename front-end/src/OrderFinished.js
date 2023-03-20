import React, { useState } from "react";
import './bootstrap.css'
import logo from "./image/circle.png";
import backgroundImage from "./image/food-image.jpg";


function OrderFinished() {
  return (
    <div className="container"> 
        <div className="background-container">
            <img src={backgroundImage} alt="Background" className="background-image" />
        </div>
        <div className="content-container">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        
            <div className="button-container">
                <button className="button btn btn-primary btn-lg">Scan Now</button>
            </div>
        </div>
    </div>
  );
}


export default OrderFinished;
