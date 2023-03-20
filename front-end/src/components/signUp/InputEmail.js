import React, { useState } from 'react';
import "./Input.css"
import "../../bootstrap.css"

function InputEmail() {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateEmailButton = () => {
    if (!validateEmail(email)) {
      setValidationMessage('Invalid email address.');
    } else {
      setValidationMessage('');
    }
    setShowValidation(true);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <div className="input-row">
          <input
            type="email-sign"
            id="email"
            className={`form-control ${
              showValidation && validationMessage
                ? 'is-invalid'
                : showValidation && !validationMessage
                ? 'is-valid'
                : ''
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={validateEmailButton}
          >
            Check
          </button>
        </div>
        {showValidation && validationMessage && <div className="invalid-feedback">{validationMessage}</div>}
      </div>
    </div>
  );
}

export default InputEmail;