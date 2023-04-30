import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link, Navigate, Outlet, } from 'react-router-dom';
import './index.css';
import Home from './components/Home/Home';
import './App.css';



import Cart from './components/cart/Cart'
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
import OrderFinished from './components/OrderFinished/OrderFinished';
import ReplyUser from './components/replyUser/ReplyUser';
import QRScanner from "./components/QRScanner/QRScanner";
import QRCodeGenerator from './components/QRCodeGenerator/QRCodeGenerator';
import RestaurantOrder from './components/Restaurant-Order/Restaurant-Order';



function App() {
  const [isLogged, setIsLogged] = React.useState(localStorage.getItem('token'));
  const [role, setRole] = React.useState(localStorage.getItem('role'))
  const ProtectedRouteUser = ({
    isAllowed,
    redirectPath = '/Login',
    role,
    
  }) => {
    if (!isAllowed && role !== 'usersbljr') {
      alert('not logging')
      return <Navigate to={redirectPath} replace />;
    }
    
    return <Outlet />;
  };
  const ProtectedRouteManager = ({
    isAllowed,
    redirectPath = '/Login',
    role,
    
  }) => {
    if (!isAllowed && role !== 'managersbjjh') {
      alert('not logging')
      return <Navigate to={redirectPath} replace />;
    }
    
    return <Outlet />;
  };
  return (
      <Router>
        <Routes>
          <Route path='/:restId' element={<Home/>}></Route>
          <Route path='/Login' element={<Login setIsLogged={setIsLogged} setRole={setRole} />}></Route>
          <Route path='/Sign-C' element={<CustomerSignUp/>}></Route>
          <Route path='/Sign-M' element={<ManagerSignUp/>}></Route>
          
          
          <Route path="/getmenu/:id" element={<RestaurantMenu />} />
          
          <Route path="/menu/:id" element={<ViewDetailMenu />} />
          <Route element={<ProtectedRouteUser isAllowed={isLogged} role={role}/>}>
            <Route path='/Profile-C' element={<EditCustomerProfile/>}/>
            <Route path='/userpastreview' element={<PastReviewPage />} />
            <Route path='/usereditreview' element={<EditReviewPage />} />
            <Route path='/usercreatereview' element={<CreateReviewPage />} />
            <Route path='/userpastorder' element={<PastOrderPage />} />
            <Route path="/customerprofile" element={<CustomerProfile setRole={setRole} setIsLogged={setIsLogged}/>} />
          </Route>
          <Route element={<ProtectedRouteManager isAllowed={isLogged} role={role}/>}>
            <Route path="/editmenu" element={<EditRestaurantMenu />} />
            <Route path="/editmenu/:id" element={<EditSpecifiedItem />} />
            <Route path="/replymenu" element={<ReplyReviews />} />
            <Route path="/replymenu/:id" element={<ReplyReviewItem />} />
            <Route path='/Profile-M' element={<ManagerProfile/>}></Route>
            <Route path='/ownerReviewDetail' element={<OwnersideReviewDetails review={review} user={user} owner={owner} />} />
            <Route path='/ownerprofile' element={<OwnerProfile setRole={setRole} setIsLogged={setIsLogged}/>} />
            <Route path='/replyUser' element={<ReplyUser/>} />
            <Route path="/restaurant-order/:id" element={<RestaurantOrder />} />
          </Route>
          <Route path='/cart/:id' element={<Cart />} />
          
          <Route path='/checkout' element={<OrderFinished/>} />
          <Route path='/reviewDetails' element={<ReviewDetails/>} />
          
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/qr-code/:id" element={<QRCodeGenerator />} />
          
        </Routes>
      </Router>

  );
}

export default App;