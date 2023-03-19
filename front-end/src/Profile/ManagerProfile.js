import React from 'react';
import '../bootstrap.css';
import './CustomerProfile.css';
import HomeButton from './HomeButton';
import ProfileImage from '../signUp/ProfileImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import SaveButton from './SaveButton';

const ManagerProfile = () => {

  return (
    <div className="customer-profile text-center">
      <HomeButton/>

      <ProfileImage/>

      <EditName business={true}/>

      <EditEmail business={true}/>

      <EditPassword/>

      <SaveButton/>
    </div>
  );
};

export default ManagerProfile;