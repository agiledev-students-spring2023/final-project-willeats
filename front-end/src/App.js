import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import './App.css';
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu';
import EditRestaurantMenu from './components/EditRestaurantMenu/EditRestaurantMenu';
import EditSpecifiedItem from './components/EditSpecifiedItem/EditSpecifiedItem';
import ReplyReviews from './components/ReplyReviewMenu/ReplyReview';
import ReplyReviewItem from './components/ReplyReviewItem/ReplyReviewItem';
import ViewDetailMenu from './components/ViewDetailMenu/ViewDetailMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<RestaurantMenu />} />
        <Route path="/editmenu" element={<EditRestaurantMenu />} />
        <Route path="/editmenu/:id" element={<EditSpecifiedItem />} />
        <Route path="/replymenu" element={<ReplyReviews />} />
        <Route path="/replymenu/:id" element={<ReplyReviewItem />} />
        <Route path="/menu/:id" element={<ViewDetailMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




