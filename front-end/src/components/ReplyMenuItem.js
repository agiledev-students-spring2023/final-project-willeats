import React, { useState } from 'react';
import './ReplyMenuItem.css';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';


function ReplyMenuItem(props) {
  const { name, price, description, image, star,id } = props;
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    const params = new URLSearchParams();
    params.append('name',name)
    params.append('description',description)
    params.append('price',price)
    params.append('image',image)
    params.append('star',star)
    navigate({pathname:`/reply/${id}`,
    search:params.toString()});
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
        rating={star}
        starRatedColor="yellow"
        numberOfStars={5}
        name='rating'
        starDimension="20px"
        starSpacing="7px"
      />
        </div>
      </div>
    </div>
  );
}

export default ReplyMenuItem;
