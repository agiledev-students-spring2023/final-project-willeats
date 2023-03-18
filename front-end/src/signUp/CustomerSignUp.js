import React from 'react';
import './CustomerSignUp.css';
import ProfileImage from './ProfileImage';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';

const CustomerSignUp = () => {
  return (
    <div className="consumer-login">
      <h1>Consumer Sign up</h1>
      <form>
        <ProfileImage/>
        <InputName business={false}/>
        <InputEmail/>
        <InputPassword/>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  </div>
    )
}
export default CustomerSignUp