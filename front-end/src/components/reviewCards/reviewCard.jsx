import React from 'react'
import {useNavigate } from "react-router-dom";
import './reviewCard.css'
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
    const handleReadmore = (e) => {
        e.stopPropagation()
        setReadmore(true)
    }
    const handleReadLess = (e) => {
        e.stopPropagation()
        setReadmore(false)
    }

    const handleClick=()=>{
        if (!props.order) {
            const params = new URLSearchParams()
            params.append('review', props.review)
            props.reviewImage.map((e) => {
                params.append('image', e)
            })
            params.append('mainName', props.mainName)
            params.append('itemName', props.itemName)
            params.append('star', props.star)
            params.append('id', props.id)
            params.append('date', props.date)
            navigate({ pathname: '/reviewDetails', search: params.toString() })
        }
    }

    const changeEdit = (e) => {
        e.stopPropagation()
        const params = new URLSearchParams()
        params.append('review', props.review)
        props.reviewImage.map((e) =>{
            params.append('image', e)
        })
        params.append('mainName', props.mainName)
        params.append('itemName', props.itemName)
        params.append('star', props.star)
        if(props.id){
            params.append('id', props.id)
        }
        navigate({pathname: '/usereditreview', search: params.toString()})
    }

    const handleReply=(e)=>{
        e.stopPropagation()
        const params = new URLSearchParams()
        params.append('review', props.review)
        props.reviewImage.map((e) =>{
            params.append('image', e)
        })
        params.append('mainName', props.mainName)
        params.append('itemName', props.itemName)
        params.append('star', props.star)
        params.append('id', props.id)
        params.append('date',props.date)
        navigate({pathname: '/replyUser', search: params.toString()})
    }

    

    return(
        <div className="card size mx-auto mt-2 " >
            <div className="row" onClick={handleClick}>
                <div className='col'>

                </div>
                {!props.order && <div className="col-3 d-flex flex-row-reverse">

                    {/* add handle event, justify if the review is user's */}
                    {props.isUser ?  <button type="button" className="btn btn-link float-right" onClick={(e) => props.handleDelete(e, props.id)} >Delete</button> : <></>}
                    {props.isUser ? <button type="button" className="btn btn-link float-right" onClick={changeEdit}>Edit</button> : <></>}
                    {props.reply && <button type="button" className="btn btn-link float-right" onClick={handleReply}>Reply</button>}

                </div>}
            </div>
            <div className="row " onClick={handleClick}>
                <div className="col-3 m-1">
                    {/* image url */}
                    <img src={props.image} alt = 'logo' className="rounded-circle img-fluid"/> 
                </div>
                <div className="col">
                    <p className='fw-bold fs-3 mb-0'>{props.mainName}</p>
                    {props.itemName && <p className='card-subtitle text-muted mb-1 '>{props.itemName}</p>}
                    {props.order && <p className='card-subtitle text-muted mb-1 '>{props.itemList[0]}
                    {props.itemList.length > 1 && <span className='card-subtitle text-muted mb-1'> and {props.itemList.length - 1} others</span>}  </p> }
                    {props.order && <p className='card-subtitle text-muted mb-1 '>{"Total Price: "+props.totalPrice}</p>}
                    {props.order && <p className='card-subtitle text-muted mb-1 '>{"Order ID: "+props.id}</p>}
                    <div className='row d-flex justidy-content-between'>
                        {props.star && <div className='col'>
                            <StarRatings 
                            rating={props.star}
                            starDimension="18px"
                            starSpacing="2px"/>
                        </div>}
                        <div className='col'>
                            {props.order ? <p className=''>{props.date}</p> : <p className='text-end'>{props.date}</p>}
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
                    useGPURender={true}
                    width={dimensions.width}
                    height={200}
                    images={[...props.reviewImage]}
                    showBullets={true}
                    showNavs={true}/>}
            </div>
        </div>
    )
}

export default ReviewCard