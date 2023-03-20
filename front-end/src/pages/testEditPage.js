// import React from 'react';
// import EditMenuItem from '../components/EditMenuItem';

// function EditTestPage() {
//   return (
//     <div>
//       <h1>EditMenuItem Component Test</h1>
//       <EditMenuItem
//         name="Cheeseburger"
//         price="$8.99"
//         description="Our classic cheeseburger with all the fixings"
//         imageSrc="https://via.placeholder.com/200x200"
//         rating={4}
//       />
//     </div>
//   );
// }

// export default EditTestPage;
// import React, { useState } from 'react';
// import EditMenuItem from '../components/EditMenuItem';
// import '../components/EditRestaurantMenu.css';
// import '../bootstrap.css'

// function EditRestaurantMenu() {

//   const menuItems = [
//     {
//       category: 'Lunch Specials',
//       items: [
//         {
//           name: "Cheeseburger",
//           price: "$8.99",
//           description: "Our classic cheeseburger with all the fixings",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Fries",
//           price: "$3.99",
//           description: "Crispy, golden French fries",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     },
//     {
//       category: 'Dinner Specials',
//       items: [
//         {
//           name: "Grilled Salmon",
//           price: "$15.99",
//           description: "Fresh grilled salmon with a side of steamed veggies",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Ribeye Steak",
//           price: "$20.99",
//           description: "A juicy ribeye steak with a side of garlic mashed potatoes",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     }
//   ];

//   return (
//     <div className="restaurant-menu-container">
//     <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }}>
//     <h1>Your Menus</h1>
//     </div>
    
//       {menuItems.map((category, index) => (
//         <div key={index}>
//         <div style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//            <h1>{category.category}</h1>
//         </div>
//           <div className="menu-items-container">
//             {category.items.map((item, index) => (
//               <EditMenuItem
//                 key={index}
//                 name={item.name}
//                 price={item.price}
//                 description={item.description}
//                 image={item.imageSrc}
//               />
//             ))}
//           </div>
//           <div
//             className="add-btn d-flex justify-content-center align-items-center"
//             style={{ width: '25%' }}
//           >
//             <button type="button" className="btn btn-secondary w-100" disabled>
//               + ADD ITEM
//             </button>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }

// export default EditRestaurantMenu;

// import React, { useState } from 'react';
// import EditMenuItem from '../components/EditMenuItem';
// import '../components/EditRestaurantMenu.css';
// import '../bootstrap.css'

// function EditRestaurantMenu() {

//   const [menuItems, setMenuItems] = useState([
//     {
//       category: 'Lunch Specials',
//       items: [
//         {
//           name: "Cheeseburger",
//           price: "$8.99",
//           description: "Our classic cheeseburger with all the fixings",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Fries",
//           price: "$3.99",
//           description: "Crispy, golden French fries",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     },
//     {
//       category: 'Dinner Specials',
//       items: [
//         {
//           name: "Grilled Salmon",
//           price: "$15.99",
//           description: "Fresh grilled salmon with a side of steamed veggies",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Ribeye Steak",
//           price: "$20.99",
//           description: "A juicy ribeye steak with a side of garlic mashed potatoes",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     }
//   ]);

//   const handleDeleteCategory = (categoryIndex) => {
//     if (window.confirm(`Are you sure you want to delete ${menuItems[categoryIndex].category}?`)) {
//       const newMenuItems = [...menuItems];
//       newMenuItems.splice(categoryIndex, 1);
//       setMenuItems(newMenuItems);
//     }
//   };

//   return (
//     <div className="restaurant-menu-container">
//     <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }}>
//     <h1>Your Menus</h1>
//     </div>
    
//       {menuItems.map((category, categoryIndex) => (
//         <div key={categoryIndex}>
//         <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//         }}>
//            <h1>{category.category}</h1>
//            <button
//             className="btn btn-danger"
//             onClick={() => handleDeleteCategory(categoryIndex)}
//           >
//             Delete
//           </button>
//         </div>
//           <div className="menu-items-container">
//             {category.items.map((item, itemIndex) => (
//               <EditMenuItem
//                 key={itemIndex}
//                 name={item.name}
//                 price={item.price}
//                 description={item.description}
//                 image={item.imageSrc}
//               />
//             ))}
//           </div>
//           <div
//             className="add-btn d-flex justify-content-center align-items-center"
//             style={{ width: '25%' }}
//           >
//             <button type="button" className="btn btn-secondary w-100" disabled>
//               + ADD ITEM
//             </button>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }

// export default EditRestaurantMenu;

// import React, { useState } from 'react';
// import EditMenuItem from '../components/EditMenuItem';
// import '../components/EditRestaurantMenu.css';
// import '../bootstrap.css'

// function EditRestaurantMenu() {

//   const [menuItems, setMenuItems] = useState([
//     {
//       category: 'Lunch Specials',
//       items: [
//         {
//           name: "Cheeseburger",
//           price: "$8.99",
//           description: "Our classic cheeseburger with all the fixings",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Fries",
//           price: "$3.99",
//           description: "Crispy, golden French fries",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     },
//     {
//       category: 'Dinner Specials',
//       items: [
//         {
//           name: "Grilled Salmon",
//           price: "$15.99",
//           description: "Fresh grilled salmon with a side of steamed veggies",
//           imageSrc: "https://via.placeholder.com/100x100",
//         },
//         {
//           name: "Ribeye Steak",
//           price: "$20.99",
//           description: "A juicy ribeye steak with a side of garlic mashed potatoes",
//           imageSrc: "https://via.placeholder.com/100x100",
//         }
//       ]
//     }
//   ]);

//   const handleDeleteCategory = (categoryIndex) => {
//     if (window.confirm(`Are you sure you want to delete ${menuItems[categoryIndex].category}?`)) {
//       const newMenuItems = [...menuItems];
//       newMenuItems.splice(categoryIndex, 1);
//       setMenuItems(newMenuItems);
//     }
//   };

//   return (
//     <div className="restaurant-menu-container">
//       <div className="head">
//         <h1>Your Menus</h1>
//       </div>
//       {menuItems.map((category, categoryIndex) => (
//         <div className="category-container" key={categoryIndex}>
//           <div className="d-flex justify-content-between align-items-center category-head">
//             <h1 className="mb-0">{category.category}</h1>
//             <button
//               className="btn btn-danger"
//               onClick={() => handleDeleteCategory(categoryIndex)}
//             >
//               Delete
//             </button>
//           </div>
//           <div className="menu-items-container">
//             {category.items.map((item, itemIndex) => (
//               <EditMenuItem
//                 key={itemIndex}
//                 name={item.name}
//                 price={item.price}
//                 description={item.description}
//                 image={item.imageSrc}
//               />
//             ))}
//           </div>
//           <div className="add-btn d-flex justify-content-center align-items-center">
//             <button type="button" className="btn btn-secondary w-100" disabled>
//               + ADD ITEM
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default EditRestaurantMenu;
import React, { useState } from 'react';
import EditMenuItem from '../components/EditMenuItem';
import '../components/EditRestaurantMenu.css';
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
