import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import { parse, format } from 'date-fns';
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCards/reviewCard';
import './ReplyReviewItem.css'
import axios from 'axios'
import PageBackButton from '../pagebackButton/PageBackButton';
import LoadMoreButton from '../loadMoreButton/loadMoreButton';

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
                    <button type="button" className="btn btn-link" onClick={()=>sortReviewsByDate('MM/dd/yyyy')}>Sort by Date</button>
                    </div>
                    <div className='row d-flex justify-content-center'>
                    { reviews && reviews.map((element, index) => (
                        <ReviewCard 
                            mainName={element.name} 
                            itemName={element.itemName} 
                            review={element.review} 
                            key={index} 
                            keys={index}
                            date={element.date} 
                            star={element.star}
                            image={element.restImage}
                            reviewImage={element.reviewImage}
                           />
                    ))}
                        
                    </div>
                    <div>
                    <div className='d-flex justify-content-center mt-3'>  
                    <LoadMoreButton url={'https://my.api.mockaroo.com/pastreview1234.json?key=3c15f680'} data={reviews} setdata={setReviews} />
                    </div>                  
                    </div>
                </div>
           
        </div>
        




    )
}

export default ReplyReviewItem