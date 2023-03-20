import React, { useState, useEffect } from 'react';
import ReplyMenuItem from '../ReplyMenuItem/ReplyMenuItem';
import '../../bootstrap.css'
import axios from 'axios'

function ReplyReviews() {

  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/menu.json?key=3c15f680")
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
  return (
    <div className='row'>
      <div className='col-4'></div>
      <div className='col-4'>
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
                star = {item.star}
                id={item.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
      </div>
      <div className='col-4'></div>
    </div>
    
  );
}

export default ReplyReviews;