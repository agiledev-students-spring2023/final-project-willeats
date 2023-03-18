import React, { useState } from 'react';
import "../bootstrap.css"
import "./Input.css"

function InputPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setValidationMessage("Passwords don't match.");
    } else {
      setValidationMessage('');
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-row">
          <input
            type="password"
            id="password"
            className={`form-control ${
              validationMessage
                ? password === ''
                  ? ''
                  : 'is-invalid'
                : password === ''
                ? ''
                : 'is-valid'
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
              validationMessage
                ? confirmPassword === ''
                  ? ''
                  : 'is-invalid'
                : confirmPassword === ''
                ? ''
                : 'is-valid'
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
        {validationMessage && (
          <div className="invalid-feedback">{validationMessage}</div>
        )}
      </div>
    </>
  );
}

export default InputPassword;