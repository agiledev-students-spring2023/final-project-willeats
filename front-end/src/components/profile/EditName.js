import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import '../../bootstrap.css';

function EditName(props) {
  const [name, setName] = useState('');
  const [isNameEditable, setIsNameEditable] = useState(false);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(`/Profile-${props.business ? 'M' : 'C'}-Name`);
        setName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchName();
  }, [props.business]);

  const toggleNameEditable = () => {
    setIsNameEditable(!isNameEditable);
  };

  const handleNameSave = async () => {
    try {
        const response = await axios.post(`/Profile-${props.business ? 'M' : 'C'}-Name`, { name });
        console.log(response.data);
        setIsNameEditable(false);
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>
        {isNameEditable ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        ) : (
          name
        )}
      </h2>
      <button className="btn btn-link mb-3" onClick={isNameEditable ? handleNameSave : toggleNameEditable}>
        {isNameEditable ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default EditName;