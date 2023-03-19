import React, { useState } from 'react';
import './EditMenuItem.css';
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';


function EditMenuItem(props) {
  const { name, price, description, image,star,id } = props;
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();


  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEdit = () => {
    const params = new URLSearchParams();
    params.append('name',name)
    params.append('description',description)
    params.append('price',price)
    params.append('image',image)
    params.append('star',star)
    navigate({pathname:`/edit/${id}`,
    search:params.toString()});
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      // Handle delete functionality here
    }
  };
  

  return (
    <div className="menu-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        starSpacing="10px"
      />
        </div>
      </div>
      {showButtons && (
        <div className="menu-item-buttons">
          <button className="menu-item-button-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="menu-item-button-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default EditMenuItem;


