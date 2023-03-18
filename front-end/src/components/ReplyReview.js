import React, { useState } from 'react';
import ReplyMenuItem from './ReplyMenuItem';
import '../bootstrap.css';

function ReplyReviews() {

  const [menuItems, setMenuItems] = useState([
    {
      category: 'Lunch Specials',
      items: [
        {
          name: "Cheeseburger",
          price: "$8.99",
          description: "Our classic cheeseburger with all the fixings",
          imageSrc: "https://via.placeholder.com/100x100",
          id:1
        },
        {
          name: "Fries",
          price: "$3.99",
          description: "Crispy, golden French fries",
          imageSrc: "https://via.placeholder.com/100x100",
          id:2
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
          id:3
        },
        {
          name: "Ribeye Steak",
          price: "$20.99",
          description: "A juicy ribeye steak with a side of garlic mashed potatoes",
          imageSrc: "https://via.placeholder.com/100x100",
          id:4
        }
      ]
    }
  ]);

  return (
    <div className="restaurant-menu-container">
    <div className="head">
        <h1>View Reviews For...</h1>
    </div>
    
      {menuItems.map((category, categoryIndex) => (
        <div key={categoryIndex}>
        <div className="category">
            <h1>{category.category}</h1>
        </div>
          <div className="menu-items-container">
            {category.items.map((item, itemIndex) => (
              <ReplyMenuItem
                key={itemIndex}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.imageSrc}
                id={item.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReplyReviews;