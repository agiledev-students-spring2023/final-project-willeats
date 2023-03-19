import React, { useState } from 'react';
import '../bootstrap.css';
import './EditPassword.css'

function EditPassword() {
    const [password, setPassword] = useState('12345');
    const [isPasswordEditable, setIsPasswordEditable] = useState(false);

    const handleUpdatePassword = () => {
        const currentPassword = window.prompt('Please enter your current password:');
        if (currentPassword === password) {
          setIsPasswordEditable(true);
        } else {
          window.alert('Incorrect password. Please try again.');
        }
    };
    
    const handleSavePassword = () => {
        setIsPasswordEditable(false);
    };

    return (
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="d-flex">
            <input
                type="password"
                id="password"
                className="form-control input-border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isPasswordEditable}
            />
            <button className="btn btn-primary button-round" onClick={isPasswordEditable ? handleSavePassword : handleUpdatePassword}>
                {isPasswordEditable ? 'Save' : 'Update'}
            </button>
            </div>
        </div>
    );
};

export default EditPassword;