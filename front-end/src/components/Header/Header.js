import React from 'react';
import './Header.css';
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings';

function Header(props) {
  const { name, rating, logoSrc, backgroundSrc } = props;

  return (
    <div className="header-container" style={{ backgroundImage: `url(${backgroundSrc})` }}>
      <div className="header-logo-container">
        <img src={logoSrc} alt="Logo" className="header-logo rounded-circle" />
        <div className='name'><h1 className="header-name">{name}</h1></div>
        
        <div className="header-rating">
        <StarRatings
                rating={props.rating}
                starRatedColor="yellow"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="4px"
              />
        </div>
      </div>
    </div>
  );
}

export default Header;


