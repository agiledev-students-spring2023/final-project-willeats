import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MenuItem from '../MenuItem/MenuItem.jsx';
import CartIcon from '../CartIcon/CartIcon';
import './RestaurantMenu.css'
import '../../bootstrap.css'
import axios from 'axios';
import HomeButton from '../profile/HomeButton';
import PageBackButton from '../pagebackButton/PageBackButton';
import TopBar_Cprofile from '../topBar/TopBar-C-profile';



function RestaurantMenu() {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(0);
  const [menuItems, setMenuItems] = useState();
  const [restaurantName, setRestaurantName] = useState('')

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      setCount(cartItems.length)
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        let data = response.data
        console.log(data)
        data = Object.values(
          data.reduce((acc, item) => {
            const category = item.category;
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
              imageSrc: "https://picsum.photos/200/300",
              star: item.star,
              id: item.id.$oid,
            });
            return acc;
          }, {})
        );
        setMenuItems(data);
        console.log(response.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/restaurant_name.json?key=3c15f680")
      .then((response) => {
        const data = response.data

        setRestaurantName(data[0].name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='row'>
        <div className="restaurant-menu-container">
            <TopBar_Cprofile/>

          <Header
            name={restaurantName}
            rating={4}
            logoSrc="https://picsum.photos/200/200"
            backgroundSrc="https://picsum.photos/1500/500"
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
                    star={item.star}
                    id={item.id}
                    toCart={true}
                    edit={false}
                    reply = {false}
                    menu = {true}
                    onAddToCart={() => handleAddToCart({ name: item.name, price: item.price, description: item.description })}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="cart-container d-flex flex-row-reverse">
            <CartIcon count={cartItems.length} />
          </div>
        </div>
      
    </div>
  );
}

export default RestaurantMenu;
