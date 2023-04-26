import React from 'react';
import '../../bootstrap.css';
import './CustomerProfile.css';
import ProfileImage from '../signUp/ProfileImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import SaveButton from './SaveButton';
import TopBar from '../topBar/TopBar';

const EditCustomerProfile = () => {

  return (
    <div className="customer-profile text-center">
      <TopBar/>

      <ProfileImage/>

      <EditName business={false}/>

      <EditEmail business={false}/>

      <EditPassword/>
    </div>
  );
};

export default EditCustomerProfile;