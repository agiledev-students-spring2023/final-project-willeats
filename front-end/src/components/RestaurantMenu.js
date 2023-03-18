import React, { useState } from 'react';
import Header from './Header';
import MenuItem from './MenuItem';
import CartIcon from './CartIcon';
import './RestaurantMenu.css';

function RestaurantMenu() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, item]));
  };

  const restaurantName = "LaoMa Spicy"; // Set the name of the restaurant here

  const menuItems = [
    {
      category: 'Lunch Specials',
      items: [
        {
          name: "Cheeseburger",
          price: "$8.99",
          description: "Our classic cheeseburger with all the fixings",
          imageSrc: "https://via.placeholder.com/100x100",
        },
        {
          name: "Fries",
          price: "$3.99",
          description: "Crispy, golden French fries",
          imageSrc: "https://via.placeholder.com/100x100",
        }
      ]
    },
    {
      category: 'Dinner Specials',
      items: [
        {
          name: "Grilled Salmon",
          price: "$15.99",
          description: "Fresh grilled salmon with a side of steamed veggies",
          imageSrc: "https://via.placeholder.com/100x100",
        },
        {
          name: "Ribeye Steak",
          price: "$20.99",
          description: "A juicy ribeye steak with a side of garlic mashed potatoes",
          imageSrc: "https://via.placeholder.com/100x100",
        }
      ]
    }
  ];

  return (
    <div className="restaurant-menu-container">
      <Header
        name={restaurantName}
        rating={4}
        logoSrc="https://via.placeholder.com/400x400"
        backgroundSrc="https://via.placeholder.com/1500x500"
      />
      {menuItems.map((category, index) => (
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
                onAddToCart={() => handleAddToCart({ name: item.name, price: item.price })}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="cart-container">
        <CartIcon count={cartItems.length} />
      </div>
    </div>
  );
}

export default RestaurantMenu;
