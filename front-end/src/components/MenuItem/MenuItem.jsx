import React from 'react'
import { useNavigate } from "react-router-dom";
// import '../reviewCards/reviewCard.css'
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings'
import { useState, useEffect, useRef } from 'react';
// import './MenuItem.css'


function MenuItem(props) {
  const refContainer = useRef();
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [readmore, setReadmore] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  const handleMenuItemClick = (e) => {
    const params = new URLSearchParams();
    params.append('name',props.name)
    params.append('description',props.description)
    params.append('price',props.price)
    params.append('image',props.image)
    params.append('star',props.star)
    if (props.menu) {
      navigate({
        pathname: `/menu/${props.id}`,
        search: params.toString()
      });
    }
    if (props.reply) {
      navigate({
        pathname: `/replymenu/${props.id}`,
        search: params.toString()
      });
    }
    if(props.edit){
      setShowButtons(!showButtons);
    }
      
  }

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    const params = new URLSearchParams();
    params.append('name',props.name)
    params.append('description',props.description)
    params.append('price',props.price)
    params.append('image', props.image)
    params.append('star',props.star)
    navigate({pathname:`/editmenu/${props.id}`,
    search:params.toString()});
  }
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${props.name}?`)) {
      // Handle delete functionality here
    }
  };

  const handleAddToCartClick = (event) => {
    event.stopPropagation(); // stop the event from bubbling up to the parent component
    props.onAddToCart();
  };
  

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  return (
    <div className="card  bg-light mw-100 mt-2 align-self-center" onClick={handleMenuItemClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="row">
      <div className="col-3 m-1 pl-2">
      <img src={props.image} alt = 'logo' className="img-fluid"/> 
  </div>
        <div className="col">
          <p className='fw-bold fs-4 mb-0'>{props.name}</p>
          <div className='row'>
            {props.star && <div className='col-8'>
              <StarRatings
                rating={props.star}
                starDimension="20px"
                starSpacing="4px" />
            </div>}
            <div className='row'>
              <p className='fs-5'>{props.description}</p>
            </div>
            {props.edit && showButtons &&(
              <div className="menu-item-buttons d-flex flex-row-reverse">
                <button className="btn btn-dark" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
            <div className='d-flex justify-content-between'>
                <h3 className="card-text">{props.price}</h3>
                {props.toCart&&<button className="btn btn-dark" onClick={handleAddToCartClick}>add to cart</button>}
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default MenuItem



