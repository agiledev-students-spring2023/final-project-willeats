import React from 'react'
import {useNavigate } from "react-router-dom";
import './reviewCard.css'
import logo from '../image/circle.png'
import '../bootstrap.css'
import StarRatings from 'react-star-ratings'
import SimpleImageSlider from "react-simple-image-slider";
import { useState, useEffect, useRef } from 'react';

function TestMenuItem(props) {
    const refContainer = useRef();
    const navigate = useNavigate();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [readmore, setReadmore] = useState(false)
    
    useEffect(() => {
        if (refContainer.current) {
          setDimensions({
            width: refContainer.current.offsetWidth,
            height: refContainer.current.offsetHeight,
          });
        }
      }, []);
    return(
        <div className="card size mx-auto mt-2" ref={refContainer}>
            <div className="row">
                <div className='col-9'>

                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <img src={logo} alt = 'logo' className="img-thumbnail img-fluid"/> 
                </div>
                <div className="col">
                    <p className='fw-bold fs-3 mb-0'>{'Name'}</p>
                    <div className='row'>
                        {props.star && <div className='col-8'>
                            <StarRatings 
                            rating={props.star}
                            starDimension="20px"
                            starSpacing="4px"/>
                        </div>}
                       
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TestMenuItem