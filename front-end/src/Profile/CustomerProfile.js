import React, { useState } from 'react';
import '../bootstrap.css';
import './CustomerProfile.css';
import HomeButton from './HomeButton';

const CustomerProfile = () => {
    const [name, setName] = useState('John Josh');
    const [email, setEmail] = useState('john.josh@example.com');
    const [password, setPassword] = useState('12345');
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);
    const [isNameEditable, setIsNameEditable] = useState(false);
    const [profileImage, setProfileImage] = useState('https://picsum.photos/200/300');

    const toggleEmailEditable = () => {
      setIsEmailEditable(!isEmailEditable);
    };
  
    
    const handleUpdatePassword = () => {
      const currentPassword = window.prompt('Please enter your current password:');
      if (currentPassword === password) {
        setIsPasswordEditable(true);
      } else {
        window.alert('Incorrect password. Please try again.');
      }
    };
  
    const handleSavePassword = () => {
      setIsPasswordEditable(false);
    };

    const toggleNameEditable = () => {
      setIsNameEditable(!isNameEditable);
    };
  
    const handleNameSave = () => {
      toggleNameEditable();
    };
  
    const handleSave = () => {
      window.alert('Changes Saved Successfully');
    };
  
    const handleProfileImageChange = (event) => {
      if (event.target.files.length === 0) {
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
  
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
    };
  

  return (
    <div className="customer-profile text-center" style={{maxWidth: '500px', margin: '0 auto'}}>
      <HomeButton/>

      <label htmlFor="profile-image" className='text-center'>
        <img
            src={profileImage}
            alt="Profile"
            className="rounded-circle profile-image d-block mx-auto"
            onClick={() => document.getElementById('profile-image-input').click()}
        />
        <input
            type="file"
            id="profile-image-input"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
        />
      </label>

      <div className="d-flex flex-column align-items-center">
        <h2>
            {isNameEditable ? (
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />
            ) : (
            name
            )}
        </h2>
        <button className="btn btn-link mb-3" onClick={isNameEditable ? handleNameSave : toggleNameEditable}>
            {isNameEditable ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="d-flex">
          <input
            type="email"
            id="email"
            className="form-control input-border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEmailEditable}
          />
          <button className="btn btn-primary button-round" onClick={toggleEmailEditable}>
            {isEmailEditable ? 'Save' : 'Update'}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="d-flex">
          <input
            type="password"
            id="password"
            className="form-control input-border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isPasswordEditable}
          />
          <button className="btn btn-primary button-round" onClick={isPasswordEditable ? handleSavePassword : handleUpdatePassword}>
            {isPasswordEditable ? 'Save' : 'Update'}
          </button>
        </div>
      </div>

      <button className="btn btn-primary button-round" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default CustomerProfile;