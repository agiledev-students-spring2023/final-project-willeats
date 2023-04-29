import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../bootstrap.css';
import StarRatings from 'react-star-ratings';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function OrderCard(props) {
  const navigate = useNavigate();

  return (
    <div className="row mt-1">
      <div className="col-lg-2 col-md-2 col-xs-2">
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title m-b-40">{props.order.date}</h5>
            <h6 style={{fontWeight: 'bold',fontSize: '1.2rem',marginBottom: '1rem'}}>Order Dishes</h6>
            {props.order.dish && props.order.dish.map(dish => (
              <h6 key={dish._id}>{dish.name}</h6>
            ))}
          </div>
          <div id="sparkline8" className="sparkchart"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
