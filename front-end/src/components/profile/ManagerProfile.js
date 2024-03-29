import React from 'react';
import '../../bootstrap.css';
import './CustomerProfile.css';
import ProfileImage from '../signUp/ProfileImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import TopBar from '../topBar/TopBar';

const ManagerProfile = () => {

  return (
    <div className="customer-profile text-center">
      <TopBar/>

      <ProfileImage business={true}/>

      <EditName business={true}/>

      <EditEmail business={true}/>

      <EditPassword business={true}/>
    </div>
  );
};

export default ManagerProfile;