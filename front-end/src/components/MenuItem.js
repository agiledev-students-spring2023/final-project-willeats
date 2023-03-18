import React from 'react';
import './MenuItem.css';

function MenuItem({ name, description, price, image, onAddToCart }) {
  return (
    <div className="item">
      <img src={image} alt={name} className="item__image" />
      <div>
        <div className="item__name">{name}</div>
        <div className="item__price">{price}</div>
        <div>{description}</div>
        <button className="item__button" onClick={onAddToCart}>
          +
        </button>
      </div>
    </div>
  );
}

export default MenuItem;




