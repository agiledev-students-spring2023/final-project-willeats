import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import "../bootstrap.css"
import "./Login.css"

const Login = () => {
    const [selected, setSelected] = useState('user')

    const handleSelected = (type) => {
        setSelected(type)
    }

    const signUpText = (selected === 'user') ? 'Sign up' : 'Sign up for your business'

    const prohibitRefresh = (e) => {
        e.preventDefault() || (e.returnValue = false);
    };

    return (
        <div className='container-sm'>
            <h1 className='text-center'>Log in to WillEats</h1>
            <form onSubmit={prohibitRefresh}>
                <div className="login-switch-container">
                    <button className={`login-switch-button ${selected === 'user' ? 'active' : ''}`} onClick={() => handleSelected('user')}>
                    User
                    </button>
                    <button className={`login-switch-button ${selected === 'manager' ? 'active' : ''}`} onClick={() => handleSelected('manager')}>
                    Manager
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    <small id="signUp" className="text-end form-text"><a href="#">{signUpText}</a></small>
                </div>
                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-outline-dark" onClick={()=>{Navigate("#")}}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login