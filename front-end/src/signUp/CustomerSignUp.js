import React from 'react';
import './CustomerSignUp.css';
import ProfileImage from './ProfileImage';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import { useNavigate } from 'react-router-dom';

const CustomerSignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Profile-C");
  };

  return (
    <div className="consumer-login">
      <h1>Consumer Sign up</h1>
      <form onSubmit={handleSubmit}>
        <ProfileImage />
        <InputName business={false} />
        <InputEmail />
        <InputPassword />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default CustomerSignUp;