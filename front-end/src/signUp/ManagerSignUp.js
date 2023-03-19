import React from 'react';
import './CustomerSignUp.css';
import ProfileImage from './ProfileImage';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import { useNavigate } from 'react-router-dom';

const ManagerSignUp = () => {

  const Navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate("/Profile-C");
  };

  return (
    <div className="consumer-login">
      <h1>Manager Sign up</h1>
      <form onSubmit={handleSubmit}>
        <ProfileImage/>
        <InputName business={true}/>
        <InputEmail/>
        <InputPassword/>
      <button type="submit" className="btn btn-primary" onClick={useNavigate("Profile-M ")}>
        Sign Up
      </button>
    </form>
  </div>
    )
}
export default ManagerSignUp