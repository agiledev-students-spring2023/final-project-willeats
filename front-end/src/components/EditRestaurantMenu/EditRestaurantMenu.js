import React, { useState, useEffect } from 'react';
// import './EditRestaurantMenu.css';
import '../../bootstrap.css'
import swal from 'sweetalert';
import axios from 'axios';
import MenuItem from '../MenuItem/MenuItem.jsx';
import HomeButton from '../profile/HomeButton';
import PageBackButton from '../pagebackButton/PageBackButton';
import { useNavigate } from 'react-router-dom';

function EditRestaurantMenu() {

  const [menuItems, setMenuItems] = useState([]);

  const navigate = useNavigate()

  const handleEdit = () => {
    const params = new URLSearchParams();
    navigate({pathname:`/editmenu/${'1'}`,
    search:params.toString()});
  }

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



  const handleDeleteCategory = (categoryIndex) => {
    swal({
      title: `Are you sure you want to delete ${menuItems[categoryIndex].category}?`,
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          const newMenuItems = [...menuItems];
          newMenuItems.splice(categoryIndex, 1);
          setMenuItems(newMenuItems);
          swal("Category deleted successfully!", {
            icon: "success",
          });
        } else {
          swal("Deletion cancelled.");
        }
      });
  };

  return (
    <div className='row'>      
        <div className="restaurant-menu-container col">
          <div className='row d-flex justify-content-between m-1'>
            <PageBackButton />
            <HomeButton />
          </div>
          <div className="head">
            <h1>Your Menus</h1>
          </div>
          {menuItems.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <div className="category">
                <h1>{category.category}</h1>
                <button
                  className="btn btn-warning btn-circle"
                  onClick={() => handleDeleteCategory(categoryIndex)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
              <div className="menu-items-container">
                {category.items.map((item, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.imageSrc}
                    star={item.star}
                    id={item.id}
                    edit={true}
                    toCart={false}
                  />
                ))}
              </div>
              <div className="add-btn d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-secondary w-100" onClick={handleEdit}>
                  + ADD ITEM
                </button>
              </div>

            </div>
          ))}
        </div>
      

    </div>


  );
}

export default EditRestaurantMenu;