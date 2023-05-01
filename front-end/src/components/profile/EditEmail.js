import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import '../../bootstrap.css';

function EditEmail(props) {
  const [email, setEmail] = useState('');
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [initialEmail, setInitialEmail] = useState('')

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(
          `/Profile-${props.business ? 'M' : 'C'}-Email`
        );
        setEmail(response.data.email);
        setInitialEmail(response.data.email)
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmail();
  }, [props.business]);

  const toggleEmailEditable = () => {
    setIsEmailEditable(!isEmailEditable);
  };

  const saveEmail = async () => {
    if (!validateEmail(email)) {
      setEmailValidationMessage('Invalid email address.');
      setShowEmailValidation(true);
      return;
    }

    try {
      const response = await axios.get(
        `/check-email-${props.business ? 'm' : 'c'}?email=${email}`
      );
      if (response.data.exists && email !== initialEmail) {
        setEmailValidationMessage('Email is already registered.');
        setShowEmailValidation(true);
        return;
      }

      const saveResponse = await axios.post(
        `/Profile-${props.business ? 'M' : 'C'}-Email`,
        { email }
      );
      console.log(saveResponse.data);
      setIsEmailEditable(false);
      setEmailValidationMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="form-group">
      <label htmlFor="editemail" className="mb-2">
        Email
      </label>
      <div className="d-flex">
        <input
          type="email"
          id="editemail"
          className="form-control input-border"
          value={email}
          onChange={handleEmailChange}
          disabled={!isEmailEditable}
        />
        <button
          className="btn btn-primary button-round"
          onClick={isEmailEditable ? saveEmail : toggleEmailEditable}
        >
          {isEmailEditable ? 'Save' : 'Update'}
        </button>
      </div>
      {showEmailValidation && (
        <p className="text-danger">{emailValidationMessage}</p>
      )}
    </div>
  );
}

export default EditEmail;

