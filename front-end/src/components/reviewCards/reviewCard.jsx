import React from 'react'
import {useNavigate } from "react-router-dom";
import './reviewCard.css'
import logo from '../../image/circle.png'
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings'
import SimpleImageSlider from "react-simple-image-slider";
import { useState, useEffect, useRef } from 'react';

function ReviewCard(props) {
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
    const handleReadmore = () => {
        setReadmore(true)
    }
    const handleReadLess = () => {
        setReadmore(false)
    }

    const changeEdit = () => {
        const params = new URLSearchParams()
        params.append('mainName', props.mainName)
        params.append('itemName', props.itemName)
        params.append('star', props.star)
        navigate({pathname: '/usereditreview', search: params.toString()})
    }
    return(
        <div className="card size mx-auto mt-2">
            <div className="row">
                <div className='col-9'>

                </div>
                {!props.order && <div className="col-3 d-flex flex-row-reverse">
                    {/* add handle event, justify if the review is user's */}
                    <button type="button" className="btn btn-link float-right">Delete</button>
                    <button type="button" className="btn btn-link float-right" onClick={changeEdit}>Edit</button>

                </div>}
            </div>
            <div className="row">
                <div className="col-3 m-1">
                    {/* image url */}
                    <img src={logo} alt = 'logo' className="rounded-circle img-fluid"/> 
                </div>
                <div className="col">
                    <p className='fw-bold fs-3 mb-0'>{props.mainName}</p>
                    {props.itemName && <p className='card-subtitle text-muted mb-1 '>{props.itemName}</p>}
                    {props.order && <p className='card-subtitle text-muted mb-1 '>{props.itemList[0]}
                    {props.itemList.length > 1 && <span className='card-subtitle text-muted mb-1'> and {props.itemList.length - 1} others</span>}  </p> }
                    <div className='row'>
                        {props.star && <div className='col-8'>
                            <StarRatings 
                            rating={props.star}
                            starDimension="20px"
                            starSpacing="4px"/>
                        </div>}
                        <div className='col'>
                            <p>{props.date}</p>
                        </div>
                    </div>
                    
                    {!props.order && <div>
                        {readmore ? <p className='mb-0'>{props.review}</p> : <p className='mb-0'>{props.review.substring(0, 50)}...</p>}
                        {readmore === false && !props.order ? <button type="button" className="btn btn-link p-0" onClick={handleReadmore} >Read More</button> :
                        <button type="button" className="btn btn-link p-0" onClick={handleReadLess} >Read Less</button>}
                    </div>}
                    {props.CreateButton && <props.CreateButton itemList={props.itemList} mainName={props.mainName}/>}
                </div>
            </div>
            <div className="row rounded mt-1" ref={refContainer}>
                {dimensions.width !== 0 && !props.order &&
                <SimpleImageSlider
                    width={dimensions.width}
                    height={200}
                    images={["https://picsum.photos/200/300",
                    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
                    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",]}
                    showBullets={true}
                    showNavs={true}/>}
            </div>
        </div>
    )
}

export default ReviewCard