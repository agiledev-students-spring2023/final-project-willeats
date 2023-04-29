import {React, useState, useEffect} from 'react'
import '../../bootstrap.css';
import './CustomerProfile.css'
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/TopBar';
import axios from 'axios';

function CustomerProfile() {
  const navigate = useNavigate()

  const [userData, setUserData] = useState([])
  useEffect(() => {
      axios.get('http://localhost:3001/getuser')
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
    navigate('/menu')
  }
  
  const navigateHome = () => {
    navigate('/')
  }

  const handleLogOut = () => {
    navigateHome();
    localStorage.clear();
  }

  return (
    <div>
      <TopBar/>
      <div className="main">
        <div className="profile-image">
          <img src={userData.image} alt="Profile pic" />
          
          
        </div>
        <h2>{name}</h2>
        <div className="d-grid gap-2">
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateOrder}>My Orders</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateReview}>My Reviews</button>
          <button type="button" className="btn btn-lg btn-outline-primary" onClick={navigateAccount}>Account Settings</button>
          <button type="button" className="btn btn-lg btn-primary btn-lg" onClick={navigateScan}>Scan Now</button>
        </div>
        <button className="btn btn-link logout" onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default CustomerProfile;
