import React, { useState } from 'react';
import "../../bootstrap.css"
import "./Input.css"

function InputPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setValidationMessage("Passwords don't match.");
    } else {
      setValidationMessage('');
    }
    setShowValidation(true);
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-row">
          <input
            type="password-sign"
            id="password"
            className={`form-control ${
              showValidation && validationMessage
                ? password === ''
                  ? ''
                  : 'is-invalid'
                : showValidation && !validationMessage
                ? 'is-valid'
                : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <div className="input-row">
          <input
            type="password"
            id="confirm-password"
            className={`form-control ${
              showValidation && validationMessage
                ? confirmPassword === ''
                  ? ''
                  : 'is-invalid'
                : showValidation && !validationMessage
                ? 'is-valid'
                : ''
            }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={validatePasswords}
          >
            Check
          </button>
        </div>
        {showValidation && validationMessage && (
          <div className="invalid-feedback">{validationMessage}</div>
        )}
      </div>
    </>
  );
}

export default InputPassword;