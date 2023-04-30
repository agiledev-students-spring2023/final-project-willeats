import React, { useState } from 'react';
import axios from '../axiosConfig';
import './CustomerSignUp.css';
import './Input.css'
import ProfileImage from './ProfileImage';
import { useNavigate } from 'react-router-dom';
import TopBar from '../topBar/TopBar';

const CustomerSignUp = () => {
  const [name, setName] = useState('');
  const [NameValidationMessage, setNameValidationMessage] = useState('1');
  const [showNameValidation, setShowNameValidation] = useState(false);
  const [email, setEmail] = useState('');
  const [EmailValidationMessage, setEmailValidationMessage] = useState('1');
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [PasswordValidationMessage, setPasswordValidationMessage] = useState('1');
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);
  const navigate = useNavigate();

  const checkName = async () => {
    try {
      const response = await axios.get(`/check-name-c?username=${name}`);
      if (response.data.exists) {
        setNameValidationMessage(`${response.data.registeredName} is already registered.`);
        setShowNameValidation(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateName = () => {
    if (name.length > 20) {
      setNameValidationMessage('Name must be less than or equal to 20 characters.');
    } else if (name === '') {
      setNameValidationMessage('Name is required.');
    } else {
      setNameValidationMessage('');
    }
    setShowNameValidation(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNameBlur = (e) => {
    validateName()
    checkName()
  }

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordValidationMessage("Passwords don't match.");
    } else {
      setPasswordValidationMessage('');
    }
    setShowPasswordValidation(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateEmailButton = () => {
    if (!validateEmail(email)) {
      setEmailValidationMessage('Invalid email address.');
    } else {
      setEmailValidationMessage('');
    }
    setShowEmailValidation(true);
  };

  const checkEmail = async () => {
    try {
      const response = await axios.get(`/check-email-c?email=${email}`);
      if (response.data.exists) {
        setEmailValidationMessage('Email is already registered. Try to log in.');
        setShowEmailValidation(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = (e) => {
    validateEmailButton();
    checkEmail();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/Sign-C', { name, email, password });
      navigate('/Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="consumer-login">
      <TopBar />
      <h1 className="mb-4">User Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              {'User Name'}
            </label>
            <div className="input-row">
              <input
                type="text"
                id="name"
                className={`form-control ${showNameValidation && NameValidationMessage
                  ? 'is-invalid'
                  : showNameValidation && !NameValidationMessage
                    ? 'is-valid'
                    : ''
                  }`}
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
              />
            </div>
            {showNameValidation && NameValidationMessage && (
              <div className="invalid-feedback">{NameValidationMessage}</div>
            )}
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-row">
              <input
                type="email"
                id="email"
                className={`form-control ${showEmailValidation && EmailValidationMessage
                    ? 'is-invalid'
                    : showEmailValidation && !EmailValidationMessage
                      ? 'is-valid'
                      : ''
                  }`}
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
            </div>
            {showEmailValidation && EmailValidationMessage && (
              <div className="invalid-feedback">{EmailValidationMessage}</div>
            )}
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <input
                type="password"
                id="password"
                className={`form-control ${showPasswordValidation && PasswordValidationMessage
                    ? password === ''
                      ? ''
                      : 'is-invalid'
                    : showPasswordValidation && !PasswordValidationMessage
                      ? 'is-valid'
                      : ''
                  }`}
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-row">
              <input
                type="password"
                id="confirm-password"
                className={`form-control ${showPasswordValidation && PasswordValidationMessage
                    ? confirmPassword === ''
                      ? ''
                      : 'is-invalid'
                    : showPasswordValidation && !PasswordValidationMessage
                      ? 'is-valid'
                      : ''
                  }`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validatePasswords(password, e.target.value);
                }}
              />
            </div>
            {showPasswordValidation && PasswordValidationMessage && (
              <div className="invalid-feedback">{PasswordValidationMessage}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled = {NameValidationMessage !== '' || EmailValidationMessage !== '' || PasswordValidationMessage !== ''}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CustomerSignUp;