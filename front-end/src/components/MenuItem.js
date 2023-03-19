import React from 'react'
import { useNavigate } from "react-router-dom";
import './reviewCard.css'
import logo from '../image/circle.png'
import '../bootstrap.css'
import StarRatings from 'react-star-ratings'
import { useState, useEffect, useRef } from 'react';


function MenuItem(props) {
  const refContainer = useRef();
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [readmore, setReadmore] = useState(false)

  const handleMenuItemClick = () => {
    navigate(`/menu/${props.id}`);
  }
  

  useEffect(() => {
    if (refContainer.current) {
      setDimensions({
        width: refContainer.current.offsetWidth,
        height: refContainer.current.offsetHeight,
      });
    }
  }, []);
  return (
    <div className="card size mx-auto mt-2 " style={{ width: '28rem' }} onClick={handleMenuItemClick}>
      <div className="row">
        <div className='col-9'>

        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <img src={logo} alt='logo' className="img-thumbnail img-fluid" />
        </div>
        <div className="col">
          <p className='fw-bold fs-4 mb-0'>{props.name}</p>
          <div className='row'>
            {props.star && <div className='col-8'>
              <StarRatings
                rating={props.star}
                starRatedColor="yellow"
                starDimension="20px"
                starSpacing="4px" />
            </div>}
            <div className='row'>
              <p className='fs-5'>{props.description}</p>
            </div>
            <div className='d-flex justify-content-between'>
                <h3 className="card-text">{props.price}</h3>
                <button className="btn btn-primary" onClick={props.onAddToCart}>add to cart</button>
            </div>


          </div>

        </div>
      </div>
    </div>
  )
}

export default MenuItem




