import React, { useState } from 'react';
import './ReplyMenuItem.css';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';


function ReplyMenuItem(props) {
  const { name, price, description, image, rating, id } = props;
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    navigate(`/reply/${id}`);
  }

  return (
    <div className="menu-item" onClick={handleMenuItemClick}>
      <img src={image} alt={name} className="menu-item-image" />
      <div className="menu-item-details">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">{price}</div>
        <div className="menu-item-description">{description}</div>
        <div className="header-rating">
        <StarRatings
        rating={4}
        starRatedColor="yellow"
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="10px"
      />
        </div>
      </div>
    </div>
  );
}

export default ReplyMenuItem;
