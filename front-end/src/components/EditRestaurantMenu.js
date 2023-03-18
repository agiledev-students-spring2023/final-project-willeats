import React, { useState } from 'react';
import EditMenuItem from './EditMenuItem';
import './EditRestaurantMenu.css';
import '../bootstrap.css';
import swal from 'sweetalert';

function EditRestaurantMenu() {

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
    <div className="restaurant-menu-container">
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
              <EditMenuItem
                key={itemIndex}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.imageSrc}
                id={item.id}
              />
            ))}
          </div>
          <div
            className="add-btn d-flex justify-content-center align-items-center"
            style={{ width: '25%' }}
          >
            <button type="button" className="btn btn-secondary w-100" disabled>
              + ADD ITEM
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default EditRestaurantMenu;