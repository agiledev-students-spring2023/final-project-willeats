import React, { useState } from 'react';
import '../../bootstrap.css';

function EditEmail(props) {
    const [email, setEmail] = useState(() => props.business ? 'laoma@example.com' : 'john.josh@example.com');
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    const toggleEmailEditable = () => {
        setIsEmailEditable(!isEmailEditable);
    };

    return (
        <div className="form-group">
            <label htmlFor="editemail" className='mb-2'>Email</label>
            <div className="d-flex">
                <input
                    type="email"
                    id="editemail"
                    className="form-control input-border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEmailEditable}
                />
                <button className="btn btn-primary button-round" onClick={toggleEmailEditable}>
                    {isEmailEditable ? 'Save' : 'Update'}
                </button>
            </div>
        </div>
    )
};

export default EditEmail;