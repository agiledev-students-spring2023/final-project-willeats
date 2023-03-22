import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCards/reviewCard';
import './ReplyReviewItem.css'
import axios from 'axios'
import PageBackButton from '../pagebackButton/PageBackButton';


function ReplyReviewItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [images, setImages] = useState([
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/200",
        "https://picsum.photos/400/400",
    ]);
    const [reviews, setReviews] = useState()
    const [name, setName] = useState(new URLSearchParams(location.search).get('name'));
    const [description, setDescription] = useState(new URLSearchParams(location.search).get('description'));
    const [price, setPrice] = useState(new URLSearchParams(location.search).get('price'));
    const [rating, setRatings] = useState(parseInt(new URLSearchParams(location.search).get('star')));


    useEffect(() => {
        axios.get("https://my.api.mockaroo.com/pastreview1234.json?key=3c15f680")
        .then((response)=>{
            const data = response.data
            console.log(data)
            setReviews(data)
        }).catch((err)=>{
            console.log(err)
        })
            
        
    },[])

    return (
        <div className='row'>
                        
            <div className='ReplyReview-Container'>
            <PageBackButton></PageBackButton>
                    <div className="image-slider-container">
                        <SimpleImageSlider
                            width={500}
                            height={200}
                            images={images.map(image => ({ url: image }))}
                            navStyle={1}
                            showNavs={true}
                            useGPURender={true}
                            slideDuration={0.5}
                            navWidth={60}
                            navHeight={10}
                            onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
                        />
                    </div>
                    <div className="card border-0">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <StarRatings
                                rating={rating}
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="10px"
                            />
                            <p className="card-text">{description}</p>
                            <h3 className="card-text">{price}</h3>
                        </div>
                    </div>
                    <div className='sort-btn'>
                    <button type="button" className="btn btn-link">Sort by Recent</button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        { reviews && <ReviewCard
                        mainName={reviews[0].name}
                        star={reviews[0].star}
                        date={reviews[0].date}
                        order={false}
                        review={reviews[0].review}
                        reply={true}
                        image ={reviews[0].restImage}
                        reviewImage = {reviews[0].reviewImage}
                        />}
                        
                    </div>
                    <div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="button" className="btn btn-warning btn-sm">Load More...</button>
                    </div>
                    </div>
                </div>
           
        </div>
        




    )
}

export default ReplyReviewItem