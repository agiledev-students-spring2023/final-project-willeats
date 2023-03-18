import React, { useState } from 'react';
import "./Input.css"
import "../bootstrap.css"

function InputName(props) {
  const [name, setName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const validateName = () => {
    if (name.length > 20) {
      setValidationMessage('Name must be less than or equal to 20 characters.');
    } else if (name === '') {
      setValidationMessage('Name is required.');
    } else {
      setValidationMessage('');
    }
  };

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
            className={`form-control ${
              validationMessage
                ? name === ''
                  ? ''
                  : 'is-invalid'
                : name === ''
                ? ''
                : 'is-valid'
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={validateName}>
            Check
          </button>
        </div>
        {validationMessage && <div className="invalid-feedback">{validationMessage}</div>}
      </div>
    </div>
  );
}

export default InputName;