// import React from 'react';
// import RestaurantHeader from '../components/Header';
// import MenuItems from '../components/menuItem';

// function MenuPage() {
//   const restaurantName = 'The Best Restaurant';
//   const starRating = 4.5;
//   const backgroundImageUrl = 'https://via.placeholder.com/800x400';
//   const logoUrl = 'https://via.placeholder.com/100';
//   const items = [
//     {
//       id: 1,
//       name: 'Item 1',
//       description: 'Description 1',
//       price: 9.99,
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 2,
//       name: 'Item 2',
//       description: 'Description 2',
//       price: 12.99,
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 3,
//       name: 'Item 3',
//       description: 'Description 3',
//       price: 15.99,
//       image: 'https://via.placeholder.com/150',
//     },
//   ];

//   return (
//     <div className="menu-page-container">
//       <RestaurantHeader
//         name={restaurantName}
//         rating={starRating}
//         backgroundImageUrl={backgroundImageUrl}
//         logoUrl={logoUrl}
//       />
//       <div className="menu-page-content">
//         <h1 className="menu-page-title">Menu</h1>
//         <MenuItems items={items} />
//       </div>
//     </div>
//   );
// }

// export default MenuPage;

// import React from 'react';
// import RestaurantMenu from '../components/RestaurantMenu';

// function TestPage() {
//   return (
//     <div>
//       <RestaurantMenu />
//     </div>
//   );
// }

// export default TestPage;

import React from 'react';
import RestaurantMenu from '../components/RestaurantMenu';

const menuItems = [
  {
    id: 1,
    name: 'Cheeseburger',
    price: 9.99,
    image: 'https://via.placeholder.com/150',
    description: 'A delicious cheeseburger made with our special sauce',
    category: 'Lunch Specials',
  },
  {
    id: 2,
    name: 'Spaghetti and Meatballs',
    price: 11.99,
    image: 'https://via.placeholder.com/150',
    description: 'A classic Italian dish with our homemade meatballs',
    category: 'Dinner Specials',
  },
  {
    id: 3,
    name: 'Caesar Salad',
    price: 8.99,
    image: 'https://via.placeholder.com/150',
    description: 'A light and refreshing salad with a classic Caesar dressing',
    category: 'Appetizers',
  },
  {
    id: 4,
    name: 'New York Strip Steak',
    price: 24.99,
    image: 'https://via.placeholder.com/150',
    description: 'A juicy and flavorful steak cooked to perfection',
    category: 'Dinner Specials',
  },
  {
    id: 5,
    name: 'Fettuccine Alfredo',
    price: 12.99,
    image: 'https://via.placeholder.com/150',
    description: 'A creamy pasta dish with Parmesan cheese and butter',
    category: 'Dinner Specials',
  },
  {
    id: 6,
    name: 'Fish and Chips',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    description: 'A classic English dish with crispy battered fish and French fries',
    category: 'Lunch Specials',
  },
];

function TestPage() {
  return (
    <div>
      <RestaurantMenu
        name="My Restaurant"
        rating={4.5}
        logoSrc="https://via.placeholder.com/100"
        backgroundSrc="https://via.placeholder.com/500x200"
        menuItems={menuItems}
      />
    </div>
  );
}

export default TestPage;




