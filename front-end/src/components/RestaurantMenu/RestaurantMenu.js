import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MenuItem from '../MenuItem/MenuItem.jsx';
import CartIcon from '../CartIcon/CartIcon';
import './RestaurantMenu.css'
import '../../bootstrap.css'
// import axios from 'axios';
import axios from '../axiosConfig';
import TopBar_profile from '../topBar/TopBar-profile';
import { redirect, useParams, useNavigate} from 'react-router-dom';

function RestaurantMenu() {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [menuItems, setMenuItems] = useState();
  const [restaurant, setRestaurant] = useState({})
  // const [restaurantId, setRestaurantId]=useState('6444893a4f71daabbde15f35')
  const [restaurantRating, setRestaurantRating] = useState(0);
  const {id}= useParams();
  console.log(useParams());
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
    setCount(JSON.parse(localStorage.getItem('cartItems')).length)
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      setCount(cartItems.length)
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/getMenuById/${id}`)
      .then((response) => {
        let data = response.data
        let totalRating = data.map(obj => obj.rating).reduce((acc, val) => acc + val, 0);
        setRestaurantRating(totalRating/data.length)
        console.log("----------------",restaurantRating)
        console.log(data)
        data = Object.values(
          data.reduce((acc, item) => {
            const category = item.type;
            if (!acc[category]) {
              acc[category] = {
                category: category,
                items: [],
              };
            }
            acc[category].items.push({
              name: item.name,
              price: item.price,
              description: item.description,
              imageSrc: item.photo,
              star: item.star,
              id: item._id,
              rating:item.rating
            });
            return acc;
          }, {})
        );
        setMenuItems(data);
        console.log(response.data[0].rating);

      })
      .catch((error) => {
          
          console.log(error)
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/getRestaurantInfo/${id}`)
      .then((response) => {
        const data = response.data
        console.log(data)
        setRestaurant(data);
      })
      .catch((error) => {
        alert('Restaurant not found');
        navigate('/login');
      });
  }, []);
  

  return (
    <div className='row'>
        <div className="restaurant-menu-container">
        <div className='row d-flex justify-content-between m-1'>
            <TopBar_profile />
          </div>
          <Header
            name={restaurant.name}
            rating={restaurantRating}
            logoSrc={restaurant.avatar}
            backgroundSrc={restaurant.background}
          />
          {menuItems && menuItems.map((category, index) => (
            <div key={index}>
              <div style={{
                display: 'flex',
              }}>
                <h1>{category.category}</h1>
              </div>
              <div className="menu-items-container">
                {category.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.imageSrc}
                    rating={item.rating} 
                    id={item.id}
                    toCart={true}
                    edit={false}
                    reply = {false}
                    menu = {true}
                    onAddToCart={() => handleAddToCart({ id:item.id,name: item.name, price: item.price, description: item.description })}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="cart-container d-flex flex-row-reverse">
            <CartIcon count={count} id = {id}/>
          </div>
        </div>
      
    </div>
  );
}

export default RestaurantMenu;
