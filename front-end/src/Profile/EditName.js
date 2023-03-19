import React, { useState } from 'react';
import '../bootstrap.css';

function EditName(props) {
    const [name, setName] = useState(() => props.business ? 'Lao Ma Spicy' : 'John Josh');
    const [isNameEditable, setIsNameEditable] = useState(false);

    const toggleNameEditable = () => {
        setIsNameEditable(!isNameEditable);
      };
    
      const handleNameSave = () => {
        toggleNameEditable();
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