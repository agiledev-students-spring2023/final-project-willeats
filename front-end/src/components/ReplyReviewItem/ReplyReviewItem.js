import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCard/ReviewCard';
import './ReplyReviewItem.css'


function ReplyReviewItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [images, setImages] = useState([
        "https://picsum.photos/200/300",
        "https://picsum.photos/200/200",
        "https://picsum.photos/400/400",
    ]);
    const [name, setName] = useState(new URLSearchParams(location.search).get('name'));
    const [description, setDescription] = useState(new URLSearchParams(location.search).get('description'));
    const [price, setPrice] = useState(new URLSearchParams(location.search).get('price'));
    const [rating, setRatings] = useState(parseInt(new URLSearchParams(location.search).get('star')));
    const review = {mainName:'ljr',star: 4, date:'20020222',review:'I recently had the pleasure of indulging in one of the most scrumptious and satisfying breakfast dishes'}

    return (
        <div className='row'>
            <div className='col-4'>                           
            </div>
            <div className='col-4'>             
            <div className='ReplyReview-Container'>
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
                    <div className="card" style={{ width: '31.2rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <StarRatings
                                rating={rating}
                                starRatedColor="yellow"
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
                        <ReviewCard
                        mainName={review.mainName}
                        star={review.star}
                        date={review.date}
                        order={false}
                        review={review.review}
                        reply={true}
                        />
                        
                    </div>
                    <div>
                    <div className='d-flex justify-content-center mt-3'>
                        <button type="button" className="btn btn-warning btn-sm">Load More...</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className='col-4'></div>
        </div>
        




    )
}

export default ReplyReviewItem