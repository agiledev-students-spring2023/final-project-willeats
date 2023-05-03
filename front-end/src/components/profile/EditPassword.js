// import React, { useState } from 'react';
// import axios from '../axiosConfig';
// import '../../bootstrap.css';
// import './EditPassword.css';

// function EditPassword({ business }) {
//   const [password, setPassword] = useState('88888888');
//   const [isPasswordEditable, setIsPasswordEditable] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [inputPassword, setInputPassword] = useState('');
//   const [isInvalidPassword, setIsInvalidPassword] = useState(false);
//   const [PasswordValidationMessage, setPasswordValidationMessage] = useState('');
//   const [showPasswordValidation, setShowPasswordValidation] = useState(false);

//   const handleCheckPassword = async () => {
//     try {
//       const response = await axios.post(`/Profile-${business ? 'M' : 'C'}-ComparePassword`, {
//         password: inputPassword,
//       });

//       if (response.status === 200 && response.data.isValid) {
//         setIsPasswordEditable(true);
//         setIsInvalidPassword(false);
//         setShowModal(false);
//         setPassword(inputPassword);
//         setInputPassword('');
//       } else {
//         setIsInvalidPassword(true);
//       }
//     } catch (error) {
//       console.error('Password validation failed:', error);
//     }
//   };

//   const handleSavePassword = async () => {
//     if (PasswordValidationMessage !== '') {
//       setShowPasswordValidation(true);
//       return;
//     }

//     try {
//       await axios.post(`/Profile-${business ? 'M' : 'C'}-Password`, {
//         password: password,
//       });
//       // Password saved to the database
//       setIsPasswordEditable(false);
//       setPassword('88888888')
//     } catch (error) {
//       console.error('Password update failed:', error);
//     }
//   };

//   const handleUpdatePassword = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setIsInvalidPassword(false);
//   };

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);

//     if (newPassword.length < 8) {
//       setPasswordValidationMessage('Password must have at least 8 characters.');
//     } else {
//       setPasswordValidationMessage('');
//     }
//     setShowPasswordValidation(true);
//   };

//   return (
//     <div className="form-group">
//       <label htmlFor="editpassword" className="mb-2">
//         Password
//       </label>
//       <div className="d-flex">
//         <input
//           type={isPasswordEditable ? 'text' : 'password'}
//           id="editpassword"
//           className="form-control input-border"
//           value={password}
//           onChange={handlePasswordChange}
//           disabled={!isPasswordEditable}
//         />
//         <button
//           className="btn btn-primary button-round"
//           onClick={isPasswordEditable ? handleSavePassword : handleUpdatePassword}
//         >
//           {isPasswordEditable ? 'Save' : 'Update'}
//         </button>
//       </div>
//       {showPasswordValidation && (
//         <p className="text-danger">{PasswordValidationMessage}</p>
//       )}

//       <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Enter Current Password</h5>
//               <button type="button" className="close" onClick={handleCloseModal}>
//                 <span>&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">
//               <input
//                 type="password"
//                 className={`form-control ${isInvalidPassword ? 'is-invalid' : ''}`}
//                 placeholder="Current password"
//                 value={inputPassword}
//                 onChange={(e) => setInputPassword(e.target.value)}
//               />
//               {isInvalidPassword && <div className="invalid-feedback">Incorrect password. Please try again.</div>}
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary" onClick={handleCheckPassword}>
//                 Validate
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EditPassword;


import React, { useState } from 'react';
import axios from '../axiosConfig';
import '../../bootstrap.css';
import './EditPassword.css';

function EditPassword({ business }) {
  const [password, setPassword] = useState('88888888');
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [PasswordValidationMessage, setPasswordValidationMessage] = useState('');
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const handleCheckPassword = async () => {
    try {
      const response = await axios.post(`/Profile-${business ? 'M' : 'C'}-ComparePassword`, {
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
    if (password.length < 8) {
      setPasswordValidationMessage('Password must have at least 8 characters.');
      setShowPasswordValidation(true);
      return;
    }

    try {
      setPasswordValidationMessage('');
      setShowPasswordValidation(false);
      await axios.post(`/Profile-${business ? 'M' : 'C'}-Password`, {
        password: password,
      });
      // Password saved to the database
      setIsPasswordEditable(false);
      setPassword('88888888');
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
          className={`form-control input-border ${isInvalidPassword ? 'is-invalid' : ''}`}
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
      {showPasswordValidation && (
        <p className="text-danger">{PasswordValidationMessage}</p>
      )}

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

