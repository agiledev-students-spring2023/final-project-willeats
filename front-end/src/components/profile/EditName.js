import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import '../../bootstrap.css';

function EditName(props) {
  const [name, setName] = useState('');
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [showNameValidation, setShowNameValidation] = useState(false);
  const [initialName, setInitialName] = useState('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(`/Profile-${props.business ? 'M' : 'C'}-Name`);
        setName(response.data.name);
        setInitialName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchName();
  }, [props.business]);

  const toggleNameEditable = () => {
    setIsNameEditable(!isNameEditable);
  };

  const saveName = async () => {

    if (name.length > 20) {
      setNameValidationMessage('Name must be less than or equal to 20 characters.');
      setShowNameValidation(true);
      return;
    }

    if (name === '') {
      setNameValidationMessage('Name is required.');
      setShowNameValidation(true);
      return;
    }

    try {
      const response = await axios.get(`/check-name-${props.business ? 'm' : 'c'}?username=${name}`);
      if (response.data.exists && name !== initialName) {
        setNameValidationMessage(`${response.data.registeredName} is already registered.`);
        setShowNameValidation(true);
        return;
      }

      const saveResponse = await axios.post(`/Profile-${props.business ? 'M' : 'C'}-Name`, { name });
      console.log(saveResponse.data);
      setIsNameEditable(false);
      setNameValidationMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

return (
  <div className="d-flex flex-column align-items-center">
    <h2>
      {isNameEditable ? (
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          autoFocus
        />
      ) : (
        name
      )}
    </h2>
    <button
      className="btn btn-link mb-3"
      onClick={isNameEditable ? saveName : toggleNameEditable}
    >
      {isNameEditable ? 'Save' : 'Edit'}
    </button>
    {showNameValidation && (
      <p className="text-danger">{nameValidationMessage}</p>
    )}
  </div>
);
}

export default EditName;
