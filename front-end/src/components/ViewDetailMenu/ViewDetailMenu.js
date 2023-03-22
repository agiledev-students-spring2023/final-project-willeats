// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import SimpleImageSlider from "react-simple-image-slider";
// import '../../bootstrap.css'
// import StarRatings from 'react-star-ratings';
// import ReviewCard from '../reviewCards/reviewCard';
// import './ViewDetailMenu.css';
// import CartIcon from '../CartIcon/CartIcon';
// import axios from 'axios'
// import PageBackButton from '../pagebackButton/PageBackButton';


// function ViewDetailMenu() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [images, setImages] = useState([
//         "https://picsum.photos/id/100/500/200",
//         "https://picsum.photos/id/101/500/200",
//         "https://picsum.photos/id/102/500/200",
//     ]);
//     const [name, setName] = useState('French Toast');
//     const [description, setDescription] = useState("A toast is a simple and versatile dish that can be eaten any time of the day. It's a dish that typically consists of toasted bread that is then topped with a variety of spreads or toppings. One of the most popular toppings for a toast is butter");
//     const [price, setPrice] = useState('$15');
//     const [rating, setRatings] = useState(4);
//     const [count,setCount]=useState(0);
//     const [reviews, setReviews] = useState()

//     useEffect(() => {
//         const cartItems = JSON.parse(localStorage.getItem('cartItems'));
//         if (cartItems) {
//             setCount(cartItems.length)
//         }
//       }, []);

//       useEffect(() => {
//         axios.get("https://my.api.mockaroo.com/pastreview1234.json?key=3c15f680")
//         .then((response)=>{
//             const data = response.data
//             console.log(data)
//             setReviews(data)
//         }).catch((err)=>{
//             console.log(err)
//         })
            
        
//     },[])


//     const [cartItems, setCartItems] = useState([]);

//     const handleAddToCart = (item) => {
//         setCartItems([...cartItems, item]);
//         localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
//     };

//     return (
//         <div className='row'>            
//             <div className='ReplyReview-Container'>
//             <PageBackButton></PageBackButton>
//                     <div className="image-slider-container">
//                         <SimpleImageSlider
//                             width={500}
//                             height={200}
//                             images={images.map(image => ({ url: image }))}
//                             navStyle={1}
//                             showNavs={true}
//                             useGPURender={true}
//                             slideDuration={0.5}
//                             navWidth={60}
//                             navHeight={10}
//                             onClickNav={(index) => console.log(`Clicked nav button: ${index}`)}
//                         />
//                     </div>
//                     <div className="card border-0">
//                         <div className="card-body">
//                             <h5 className="card-title">{new URLSearchParams(location.search).get('name')}</h5>
//                             <StarRatings
//                                 rating={parseInt(new URLSearchParams(location.search).get('star'))}
//                                 starRatedColor="yellow"
//                                 numberOfStars={5}
//                                 name='rating'
//                                 starDimension="20px"
//                                 starSpacing="10px"
//                             />
//                             <p className="card-text">{new URLSearchParams(location.search).get('description')}</p>
//                             <div className='d-flex justify-content-between'>
//                                 <h3 className="card-text">{new URLSearchParams(location.search).get('price')}</h3>
//                                 <button className="btn btn-primary" onClick={handleAddToCart}>add to cart</button>
//                             </div>
                            
//                         </div>
//                     </div>
//                     <div className='sort-btn'>
//                     <button type="button" className="btn btn-link">Sort by Ratings</button>
//                     </div>
//                     <div className='row d-flex justify-content-center'>
//                     { reviews && <ReviewCard
//                         mainName={reviews[0].name}
//                         star={reviews[0].star}
//                         date={reviews[0].date}
//                         order={false}
//                         review={reviews[0].review}
//                         reply={true}
//                         image ={reviews[0].restImage}
//                         reviewImage = {reviews[0].reviewImage}
//                         />}
//                     </div>
//                     <div>
//                     <div className='d-flex justify-content-center mt-3'>
//                         <button type="button" className="btn btn-warning btn-sm">Load More...</button>
//                     </div>
//                     <div className="cart-container d-flex flex-row-reverse">
//                         <CartIcon count={count} />
//                     </div>
//                     </div>
//                 </div>
         

//         </div>
        




//     )
// }

// export default ViewDetailMenu
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";
import '../../bootstrap.css'
import StarRatings from 'react-star-ratings';
import ReviewCard from '../reviewCards/reviewCard';
import './ViewDetailMenu.css';
import CartIcon from '../CartIcon/CartIcon';
import axios from 'axios'
import PageBackButton from '../pagebackButton/PageBackButton';


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
    const [reviews, setReviews] = useState()

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            setCount(cartItems.length)
        }
      }, []);

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


    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (item) => {
        setCartItems([...cartItems, item]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
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
                                <button className="btn btn-primary" onClick={handleAddToCart}>add to cart</button>
                            </div>
                            
                        </div>
                    </div>
                    <div className='sort-btn'>
                    <button type="button" className="btn btn-link">Sort by Ratings</button>
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
                    <div className="cart-container d-flex flex-row-reverse">
                        <CartIcon count={count} />
                    </div>
                    </div>
                </div>
         

        </div>
        




    )
}

export default ViewDetailMenu