import React, { useState } from 'react';
import axios from 'axios';
import './Input.css';
import '../../bootstrap.css';

function InputEmail() {
  const [email, setEmail] = useState('');
  const [EmailValidationMessage, setEmailValidationMessage] = useState('');
  const [showEmailValidation, setShowEmailValidation] = useState(false);

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
      const response = await axios.get(`/Sign-C?email=${email}`);
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

  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-row">
          <input
            type="email"
            id="email"
            className={`form-control ${
              showEmailValidation && EmailValidationMessage
                ? 'is-invalid'
                : showEmailValidation && !EmailValidationMessage
                ? 'is-valid'
                : ''
            }`}
            value={email}
            onChange={handleEmailChange}
            onBlur = {handleEmailBlur}
          />
        </div>
        {showEmailValidation && EmailValidationMessage && (
          <div className="invalid-feedback">{EmailValidationMessage}</div>
        )}
      </div>
    </div>
  );
}

export default InputEmail;