import React, { useState,useEffect } from 'react';
import axios from 'axios'
import '../../bootstrap.css';

function EditEmail(props) {
    const [email, setEmail] = useState('');
    const [isEmailEditable, setIsEmailEditable] = useState(false);

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/Profile-${props.business ? 'M' : 'C'}-Email`);
                setEmail(response.data.email);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEmail();
    }, [props.business]);

    const toggleEmailEditable = () => {
        setIsEmailEditable(!isEmailEditable);
    };

    const saveEmail = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/Profile-${props.business ? 'M' : 'C'}-Email`, { email });
            console.log(response.data);
            setIsEmailEditable(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form-group">
            <label htmlFor="editemail" className="mb-2">
                Email
            </label>
            <div className="d-flex">
                <input
                    type="email"
                    id="editemail"
                    className="form-control input-border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEmailEditable}
                />
                <button
                    className="btn btn-primary button-round"
                    onClick={isEmailEditable ? saveEmail : toggleEmailEditable}
                >
                    {isEmailEditable ? 'Save' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default EditEmail;