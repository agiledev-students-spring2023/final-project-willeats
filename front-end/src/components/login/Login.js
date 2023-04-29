import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../bootstrap.css"
import "./Login.css"
import TopBar from '../topBar/TopBar'

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const Login = () => {
    const [selected, setSelected] = useState('user')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSelected = (type) => {
        setSelected(type)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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

    const handleLogin = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/login-${selected === 'user' ? 'C' : 'M'}`, { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            Navigate(loginPath);
        } catch (error) {
            alert('Incorrect email or password. Please try again.');
            console.error(error);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          handleLogin();
        }
      };
    
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
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="loginPasswordInput" className="form-label mt-4">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="loginPasswordInput" 
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button type="button" className="btn btn-link" onClick={handleSignUp}>
                        {signUpText}
                    </button>
                </div>

                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-outline-dark" onClick={handleLogin} disabled={!email || !password}>
                        Login
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Login