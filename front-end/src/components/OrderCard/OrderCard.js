import React from 'react';
import { useNavigate } from "react-router-dom";
import '../../bootstrap.css';
import StarRatings from 'react-star-ratings';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function OrderCard(props) {
    const navigate = useNavigate();
    const date = new Date(props.order.date);
    const dateString = date.toLocaleString();


    return (
        <div className="row mt-1">
            <div className="col-lg-2 col-md-2 col-xs-2">
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title m-b-40">{dateString}</h5>
                        <h6>{props.order.user?props.order.user.name+" Order Dishes":"Annoymous Guest "+"Order Dishes"}</h6>
                        <h6>{"Order Id: "+props.order._id.slice(-4)}</h6>
                        <div className='col m-0'>
                        {props.order.dish && props.order.dish.map(ele => (
                            <div key={ele.name}>
                            <h7>
                              {ele.name} x {ele.quantity}
                            </h7>
                            <br />
                          </div>
                            
                          ))}
                          
                        </div>
                        <h5>{"Total Price: $" + props.order.totalPrice}</h5>


                    </div>
                    <div id="sparkline8" className="sparkchart"></div>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;
