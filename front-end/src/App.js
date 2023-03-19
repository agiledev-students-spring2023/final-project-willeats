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
import ViewDetailMenu from './components/ViewDetailMenu';
import TestMenuItem from './components/testMenuItem';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/edit" element={<EditRestaurantMenu />} />
        <Route path="/edit/:id" element={<EditSpecifiedItem />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reply" element={<ReplyReviews />} />
        <Route path="/reply/:id" element={<ReplyReviewItem />} />
        <Route path="/menu/:id" element={<ViewDetailMenu />} />
        <Route path="/menuItem" element={<TestMenuItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




