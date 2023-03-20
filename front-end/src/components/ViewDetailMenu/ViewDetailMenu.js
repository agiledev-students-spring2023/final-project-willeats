import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCard/ReviewCard';
import './ViewDetailMenu.css';
import CartIcon from '../CartIcon/CartIcon';


function ViewDetailMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [images, setImages] = useState([
        "https://picsum.photos/id/100/500/200",
        "https://picsum.photos/id/101/500/200",
        "https://picsum.photos/id/102/500/200",
    ]);
    const [name, setName] = useState('French Toast');
    const [description, setDescription] = useState("A toast is a simple and versatile dish that can be eaten any time of the day. It's a dish that typically consists of toasted bread that is then topped with a variety of spreads or toppings. One of the most popular toppings for a toast is butter");
    const [price, setPrice] = useState('$15');
    const [rating, setRatings] = useState(4);
    const [count,setCount]=useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            setCount(cartItems.length)
        }
      }, []);


    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (item) => {
        setCartItems([...cartItems, item]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    };

    
    
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
                            <h5 className="card-title">{new URLSearchParams(location.search).get('name')}</h5>
                            <StarRatings
                                rating={parseInt(new URLSearchParams(location.search).get('star'))}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                name='rating'
                                starDimension="20px"
                                starSpacing="10px"
                            />
                            <p className="card-text">{new URLSearchParams(location.search).get('description')}</p>
                            <div className='d-flex justify-content-between'>
                                <h3 className="card-text">{new URLSearchParams(location.search).get('price')}</h3>
                                <button className="btn btn-primary" >add to cart</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className='sort-btn'>
                    <button type="button" className="btn btn-link">Sort by Ratings</button>
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
                    <div className="cart-container d-flex flex-row-reverse">
                        <CartIcon count={count} />
                    </div>
                    </div>
                </div>
            </div>
            <div className='col-4'></div>
        </div>
        




    )
}

export default ViewDetailMenu