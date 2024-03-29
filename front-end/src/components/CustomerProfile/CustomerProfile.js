import {React, useState, useEffect} from 'react'
import '../../bootstrap.css';
import './CustomerProfile.css'
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/TopBar';
import axios from '../axiosConfig';


function CustomerProfile({setIsLogged, setRole}) {
  const navigate = useNavigate()
  const [menuExist,setMenuExist] = useState(true)
  const [userData, setUserData] = useState([])
  useEffect(() => {
      axios.get('/getuser')
      .then((res) => {
        setUserData(res.data)
      })
      .catch((err) => (
          console.log(err)
      ))
  }, []);

  const name = userData.name;

  const navigateOrder = () => {
    navigate('/userpastorder')
  }

  const navigateReview = () => {
    navigate('/userpastreview')
  }
  
  const navigateAccount = () => {
    navigate('/Profile-C')
  }
  
  const navigateScan = () => {
    
    const restaurantId = localStorage.getItem('restId')
    if(restaurantId===null){
      setMenuExist(false)
    }else{
      navigate(`/getmenu/${restaurantId}`);
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('role')
    setIsLogged(false)
    setRole(null)
    const restaurantId = localStorage.getItem('restId')
    navigate(`/getmenu/${restaurantId}`);
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    
  }

  return (
    <div>
      <TopBar/>
      <div className="main">
        <div className="profile-image">
          <img src={userData.avatar} alt="Profile pic" />
          
          
        </div>
        <h2>{name}</h2>
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateOrder}>My Orders</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateReview}>My Reviews</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateAccount}>Account Settings</button>
          {menuExist ? (
            <button type="button" className="btn btn-lg btn-primary btn-lg" onClick={navigateScan}>Enter Menu</button>
          ) : (
            <p onClick={()=>{setMenuExist(true)}}>Please scan the QR code with your camera</p>
          )}
        </div>
        <button className="btn btn-link logout" onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default CustomerProfile;
