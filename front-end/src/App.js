// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // import { Switch } from 'react-router-dom';
// // import {Route } from 'react-router-dom';
// // import {Router} from 'react-router-dom'
// import './App.css';
// import Home from './Home'
// import MenuPage from './pages/testPage';

// // function App() {
// //   return (
// //       <Home />
// //   );
// // }
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/test" element={<MenuPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './index.css';
// import Home from './Home';
// import './App.css';
// import RestaurantMenu from './components/RestaurantMenu';
// import TestPage from './pages/testPage';
// import EditTestPage from './components/EditRestaurantMenu';
// import EditSpecifiedItemPage from './components/EditSpecifiedItem';


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<RestaurantMenu />} />
//         <Route path="/test" element={<TestPage />} />
//         <Route path="/edit" element={<EditTestPage />} />
//         <Route path="/edit-menu-item/:itemId" element={<EditSpecifiedItemPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import './App.css';
import RestaurantMenu from './components/RestaurantMenu';
import TestPage from './pages/testPage';
import EditRestaurantMenu from './components/EditRestaurantMenu';
import EditSpecifiedItem from './components/EditSpecifiedItem';
import CartPage from './components/CartPage';
import ReplyReviews from './components/ReplyReview';
import ReplyReviewItem from './components/ReplyReviewItem';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/edit" element={<EditRestaurantMenu />} />
        <Route path="/edit-menu-item/:id" element={<EditSpecifiedItem />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reply" element={<ReplyReviews />} />
        <Route path="/reply/:id" element={<ReplyReviewItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




