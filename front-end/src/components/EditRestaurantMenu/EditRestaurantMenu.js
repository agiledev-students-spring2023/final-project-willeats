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
    // params.append('name',name)
    // params.append('description',description)
    // params.append('price',price)
    // params.append('image',image)
    navigate({pathname:`/editmenu/${'1'}`,
    search:params.toString()});
  }

  const handleDelete = (id) => {
    setMenuItems(menuItems.map(category => ({
      ...category,
      items: category.items.filter(item => item.id !== id),
    })));
  };

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Make a request to the backend API to fetch the menu items
    axios.get('http://localhost:3001/getmenu', {
      params: {
        token: token
      }
    })
    .then((response) => {
      // Set the menu items in the state
      let data = response.data
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
            type:item.type
          });
          return acc;
        }, {})
      );
      setMenuItems(data);
      console.log(data);
    })
    .catch(error => {
      // Handle error response
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
                    type={item.type}
                    edit={true}
                    toCart={false}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="add-btn d-flex justify-content-center align-items-center">
                <button type="button" className="btn btn-secondary w-100" onClick={handleEdit}>
                  + ADD ITEM
                </button>
              </div>
        </div>
      

    </div>


  );
}

export default EditRestaurantMenu;