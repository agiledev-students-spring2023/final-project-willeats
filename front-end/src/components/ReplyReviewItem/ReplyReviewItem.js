import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import { parse, format } from 'date-fns';
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCards/reviewCard';
import './ReplyReviewItem.css'
import axios from '../axiosConfig'
import PageBackButton from '../pagebackButton/PageBackButton';
import TopBar_profile from '../topBar/TopBar-profile';

function ReplyReviewItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [images, setImages] = useState([
        new URLSearchParams(location.search).get('image').split(',')
    ]);
    const [reviews, setReviews] = useState()
    const [name, setName] = useState(new URLSearchParams(location.search).get('name'));
    const [description, setDescription] = useState(new URLSearchParams(location.search).get('description'));
    const [price, setPrice] = useState(new URLSearchParams(location.search).get('price'));
    const [rating, setRatings] = useState(parseInt(new URLSearchParams(location.search).get('star')));
    const [id, setId] = useState(new URLSearchParams(location.search).get('id'));
    console.log(id)

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`/getReview/${id}`)
        .then((response)=>{
            const data = response.data
            console.log(data)
            setReviews(data)
        }).catch((err)=>{
            console.log(err)
        })        
    },[])


    const sortReviewsByDate = (dateFormat = 'MM/dd/yyyy') => {
        setReviews((prevReviews) => {
          const sortedReviews = [...prevReviews].sort((a, b) => {
            const dateA = parse(a.date, dateFormat, new Date());
            const dateB = parse(b.date, dateFormat, new Date());
            return dateB - dateA;
          });
      
          const formattedReviews = sortedReviews.map((review) => {
            const formattedDate = format(parse(review.date, dateFormat, new Date()), dateFormat);
            return { ...review, date: formattedDate };
          });
      
          return formattedReviews;
        });
      };

    return (
        <div className='row'>
                        
            <div className='ReplyReview-Container'>
            <TopBar_profile/>
                    <div className="image-slider-container">
                        <SimpleImageSlider
                            width={390}
                            height={200}
                            images={images.map(image => ({ url: image }))}
                            navStyle={1}
                            useGPURender={true}
                            slideDuration={0.5}
                            navWidth={60}
                            navHeight={10}
                            onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
                        />
                    </div>
                    <div className="card border-0 m-1">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <StarRatings
                                rating={parseFloat(rating)}
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="10px"
                            />
                            <p className="card-text">{description}</p>
                            <h3 className="card-text">{'$'+price}</h3>
                        </div>
                    </div>
                    <div className='sort-btn'>
                    <button type="button" className="btn btn-link" onClick={()=>sortReviewsByDate('MM/dd/yyyy')}>Sort by Date</button>
                    </div>
                    <div className='row d-flex justify-content-center m-1'>
                    { reviews && reviews.length===0? <h5>No reviews was post for this item..</h5> 
                    :reviews && reviews.map((element, index) => (
                        <ReviewCard 
                            mainName={element.name} 
                            itemName={element.itemName} 
                            review={element.review} 
                            key={index} 
                            keys={index}
                            date={element.date} 
                            star={element.rating}
                            image={element.userId.avatar}
                            reviewImage={element.image}
                            reply={true}
                            id={element._id}
                           />
                    ))}
                        
                    </div>
                    <div>
                    <div className='d-flex justify-content-center mt-3'>  

                    </div>                  
                    </div>
                </div>
           
        </div>
        




    )
}

export default ReplyReviewItem