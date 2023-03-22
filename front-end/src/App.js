import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './Home';
import './App.css';




import Cart from './components/cart/Cart'
import OrderFinished from './OrderFinished'



import {review, user, owner} from './config.js'
import OwnersideReviewDetails from './components/OwnerSideReviewDetails/OwnersideReviewDetails';
import ReviewDetails from './components/ReviewDetails/ReviewDetails';




import Login from './components/login/Login';
import CustomerSignUp from './components/signUp/CustomerSignUp';
import ManagerSignUp from './components/signUp/ManagerSignUp';
import EditCustomerProfile from './components/profile/EditCustomerProfile';
import ManagerProfile from './components/profile/ManagerProfile';
import RestaurantMenu from './components/RestaurantMenu/RestaurantMenu';
import EditRestaurantMenu from './components/EditRestaurantMenu/EditRestaurantMenu';
import EditSpecifiedItem from './components/EditSpecifiedItem/EditSpecifiedItem';
import ReplyReviews from './components/ReplyReviewMenu/ReplyReview';
import ReplyReviewItem from './components/ReplyReviewItem/ReplyReviewItem';
import ViewDetailMenu from './components/ViewDetailMenu/ViewDetailMenu';
import PastReviewPage from './components/pastReview/pastReviewPage';
import EditReviewPage from './components/editReview/editReviewPage'
import CreateReviewPage from './components/createReview/createReviewPage';
import PastOrderPage from './components/pastOrder/pastOrderPage';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import OwnerProfile from './components/OwnerProfile/OwnerProfile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Sign-C' element={<CustomerSignUp/>}></Route>
          <Route path='/Sign-M' element={<ManagerSignUp/>}></Route>
          <Route path='/Profile-C' element={<EditCustomerProfile/>}></Route>
          <Route path='/Profile-M' element={<ManagerProfile/>}></Route>
          <Route path="/menu" element={<RestaurantMenu />} />
          <Route path="/editmenu" element={<EditRestaurantMenu />} />
          <Route path="/editmenu/:id" element={<EditSpecifiedItem />} />
          <Route path="/replymenu" element={<ReplyReviews />} />
          <Route path="/replymenu/:id" element={<ReplyReviewItem />} />
          <Route path="/menu/:id" element={<ViewDetailMenu />} />
          <Route path='/userpastreview' element={<PastReviewPage/>} />
          <Route path='/usereditreview' element={<EditReviewPage/>}/>
          <Route path='/usercreatereview' element={<CreateReviewPage/>} />
          <Route path='/userpastorder' element={<PastOrderPage/>} />
          <Route path="/customerprofile" element={<CustomerProfile/>}></Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/ownerReviewDetail' element={<OwnersideReviewDetails review={review} user={user} owner={owner} />} />
          <Route path='/ownerprofile' element={<OwnerProfile/>} />
          <Route path='/checkout' element={<OrderFinished/>} />
        </Routes>
      </Router>

  );
}

export default App;