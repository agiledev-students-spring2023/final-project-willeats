import {React} from 'react';
import './CustomerSignUp.css';
import ProfileImage from './ProfileImage';
import InputName from './InputName';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/TopBar';

const CustomerSignUp = () => {

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate("/customerprofile");
  };

  return (
    <div className="consumer-login">
      <TopBar/>
      <h1 className='mb-4'>Consumer Sign up</h1>
      <form onSubmit={handleSubmit}>
        <ProfileImage />
        <InputName business={false} />
        <InputEmail />
        <InputPassword />
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CustomerSignUp;