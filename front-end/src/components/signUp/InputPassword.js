import React, { useState } from 'react';
import '../../bootstrap.css';
import './Input.css';

function InputPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [PasswordValidationMessage, setPasswordValidationMessage] = useState('');
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

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

  return (
    <div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="input-row">
          <input
            type="password"
            id="password"
            className={`form-control ${
              showPasswordValidation && PasswordValidationMessage
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
            className={`form-control ${
              showPasswordValidation && PasswordValidationMessage
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
  );
}

export default InputPassword;