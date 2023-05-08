import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import './Input.css';
import '../../bootstrap.css';

function InputName(props) {
  const [name, setName] = useState('');
  const [NameValidationMessage, setNameValidationMessage] = useState('');
  const [showNameValidation, setShowNameValidation] = useState(false);


  const checkName = async () => {
    try {
      const response = await axios.get(`/Sign-C?username=${name}`);
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

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          {props.business === true ? 'Business Name' : 'Name'}
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
  );
}

export default InputName;