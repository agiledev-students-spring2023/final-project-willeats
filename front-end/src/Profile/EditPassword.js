import React, { useState } from 'react';
import '../bootstrap.css';
import './EditPassword.css';

function EditPassword() {
  const [password, setPassword] = useState('12345');
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const handleUpdatePassword = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsInvalidPassword(false);
  };

  const handleSavePassword = () => {
    if (inputPassword === password) {
      setIsPasswordEditable(true);
      setIsInvalidPassword(false);
      setShowModal(false);
    } else {
      setIsInvalidPassword(true);
    }
    setInputPassword('');
  };

  const handleDisableEditMode = () => {
    setIsPasswordEditable(false);
  };

  return (
    <div className="form-group">
      <label htmlFor="editpassword" className='mb-2'>Password</label>
      <div className="d-flex">
        <input
          type="password"
          id="editpassword"
          className="form-control input-border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isPasswordEditable}
        />
        <button
          className="btn btn-primary button-round"
          onClick={isPasswordEditable ? handleDisableEditMode : handleUpdatePassword}
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
              <button type="button" className="btn btn-primary" onClick={handleSavePassword}>
                Save Changes
              </button>
            </div>
            
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>
  );
}

export default EditPassword;