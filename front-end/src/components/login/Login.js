import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../bootstrap.css"
import "./Login.css"
import TopBar from '../topBar/TopBar'

const Login = () => {
    const [selected, setSelected] = useState('user')

    const handleSelected = (type) => {
        setSelected(type)
    }

    const signUpText = (selected === 'user') ? "Don't yet have an account? Sign up!" : "New manager? Sign up for your business!"
    const signPath = (selected === 'user') ? '/Sign-C' : '/Sign-M'
    const loginPath = (selected === 'user') ? '/customerprofile' : '/ownerprofile'

    const prohibitRefresh = (e) => {
        e.preventDefault() || (e.returnValue = false);
    };

    const Navigate = useNavigate()

    const handleSignUp = () => {
        Navigate(signPath)
    }

    const handleLogin = () => {
        Navigate(loginPath)
    }

    const navigateMenu = () => {
        Navigate('/menu')
      }

    return (
        <div className='login-page'>
            <TopBar/>
            <h1 className='text-center mb-4'>Log in to WillEats</h1>
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
                    <label htmlFor="loginEmailInput" className="form-label mt-4">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="loginEmailInput" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginPasswordInput" className="form-label mt-4">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="loginPasswordInput" 
                        placeholder="Password"
                    />
                    <button type="button" className="btn btn-link" onClick={handleSignUp}>
                        {signUpText}
                    </button>
                </div>

                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-outline-dark" onClick={handleLogin}>
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Login