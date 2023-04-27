import React, { useState } from 'react';
import axios from 'axios';
import '../../bootstrap.css';
import './EditPassword.css';

function EditPassword({ business }) {
  const [password, setPassword] = useState('');
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const handleCheckPassword = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/Profile-${business ? 'M' : 'C'}-ComparePassword`, {
        password: inputPassword,
      });

      if (response.status === 200 && response.data.isValid) {
        setIsPasswordEditable(true);
        setIsInvalidPassword(false);
        setShowModal(false);
        setPassword(inputPassword);
        setInputPassword('');
      } else {
        setIsInvalidPassword(true);
      }
    } catch (error) {
      console.error('Password validation failed:', error);
    }
  };

  const handleSavePassword = async () => {
    try {
      await axios.post(`http://localhost:3001/Profile-${business ? 'M' : 'C'}-Password`, {
        password: password,
      });
      // Password saved to the database
      setIsPasswordEditable(false);
    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  const handleUpdatePassword = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsInvalidPassword(false);
  };

  return (
    <div className="form-group">
      <label htmlFor="editpassword" className="mb-2">
        Password
      </label>
      <div className="d-flex">
        <input
          type={isPasswordEditable ? 'text' : 'password'}
          id="editpassword"
          className="form-control input-border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isPasswordEditable}
        />
        <button
          className="btn btn-primary button-round"
          onClick={isPasswordEditable ? handleSavePassword : handleUpdatePassword}
        >
          {isPasswordEditable ? 'Save' : 'Update'}
        </button>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Enter Current Password</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="password"
                className={`form-control ${isInvalidPassword ? 'is-invalid' : ''}`}
                placeholder="Current password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              {isInvalidPassword && <div className="invalid-feedback">Incorrect password. Please try again.</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCheckPassword}>
                Validate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;