import React, { useState,useEffect } from 'react';
import axios from '../axiosConfig'
import '../../bootstrap.css';

function EditEmail(props) {
    const [email, setEmail] = useState('');
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [disable, setDisable] = useState(false)

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const response = await axios.get(`/Profile-${props.business ? 'M' : 'C'}-Email`);
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
            const response = await axios.post(`/Profile-${props.business ? 'M' : 'C'}-Email`, { email });
            console.log(response.data);
            setIsEmailEditable(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnChange = (e) =>{
     setEmail(e.target.value);
     setDisable(!validateEmail(e.target.value))
     
    }

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
                    onChange={handleOnChange}
                    disabled={!isEmailEditable}
                />
                <button
                    className="btn btn-primary button-round"
                    onClick={isEmailEditable ? saveEmail : toggleEmailEditable}
                    disabled = {disable}
                >
                    {isEmailEditable ? 'Save' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default EditEmail;