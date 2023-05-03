import React, { useState, useEffect } from 'react';
import ReplyMenuItem from '../ReplyMenuItem/ReplyMenuItem';
import '../../bootstrap.css'
import axios from '../axiosConfig'
import MenuItem from '../MenuItem/MenuItem.jsx';
import HomeButton from '../profile/HomeButton';
import PageBackButton from '../pagebackButton/PageBackButton';
import TopBar_profile from '../topBar/TopBar-profile';

function ReplyReviews() {

  const [menuItems, setMenuItems] = useState([]);
 

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get("/getmenu",{params: {
        token: token
      }})
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
              imageSrc: item.photo,
              star: item.star,
              id: item._id,
              rating:item.rating
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


      <div className="restaurant-menu-container">
        {/* <div className='row d-flex justify-content-between m-1'>
            <PageBackButton />
            <HomeButton />
          </div> */}
        <TopBar_profile />
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
                <MenuItem
                  key={itemIndex}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.imageSrc}
                  rating={item.rating}
                  id={item.id}
                  toCart={false}
                  reply={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>


    </div>
    
  );
}

export default ReplyReviews;