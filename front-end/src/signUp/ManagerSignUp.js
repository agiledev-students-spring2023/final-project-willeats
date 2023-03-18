import React from 'react';
import './CustomerSignUp.css';
import ProfileImage from './ProfileImage';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';

const ManagerSignUp = () => {
  return (
    <div className="consumer-login">
      <h1>Manager Sign up</h1>
      <form>
        <ProfileImage/>
        <InputName business={true}/>
        <InputEmail/>
        <InputPassword/>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  </div>
    )
}
export default ManagerSignUp