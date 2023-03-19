import React from 'react';
import '../bootstrap.css';
import './CustomerProfile.css';
import HomeButton from './HomeButton';
import ProfileImage from '../signUp/ProfileImage';
import EditName from './EditName';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';

const CustomerProfile = () => {

    const handleSave = () => {
      window.alert('Changes Saved Successfully');
    };

  return (
    <div className="customer-profile text-center">
      <HomeButton/>

      <ProfileImage/>

      <EditName/>

      <EditEmail/>

      <EditPassword/>

      <button className="btn btn-primary button-round" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CustomerProfile;