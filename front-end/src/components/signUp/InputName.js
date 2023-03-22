import React, { useState } from 'react';
import "./Input.css"
import "../../bootstrap.css"

function InputName(props) {
  const [name, setName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const validateName = () => {
    if (name.length > 20) {
      setValidationMessage('Name must be less than or equal to 20 characters.');
    } else if (name === '') {
      setValidationMessage('Name is required.');
    } else {
      setValidationMessage('');
    }
    setShowValidation(true);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          {props.business === true ? 'Business Name' : 'Name'}
        </label>
        <div className="input-row">
          <input
            type="text-sign"
            id="name"
            className={`form-control ${
              showValidation && validationMessage
                ? 'is-invalid'
                : showValidation && !validationMessage
                ? 'is-valid'
                : ''
            }`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={validateName}>
            Check
          </button>
        </div>
        {showValidation && validationMessage && <div className="invalid-feedback">{validationMessage}</div>}
      </div>
    </div>
  );
}

export default InputName;