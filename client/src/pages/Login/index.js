import React, { useState } from 'react';
import API from '../../services/api';
import LoginInput from '../../components/LoginInput';
import { UserContext } from '../../userContext';

const Login = () => {
        // Get the setLoginState function from the UserContext.
        const { setLoginState } = React.useContext(UserContext);

        // Set the initial state of the email and password fields.
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = async (e) => {
                e.preventDefault();

                // Send the email and password to the API.
                var response;
                try {
                        response = await API.post('/users/login', { email, password });
                } catch (error) {
                        console.error(error);
                }

                // If the login is successful, set the user in the user context and store the user in the local storage.
                if (response.status === 200) {
                        setLoginState(true);
                        delete response.data.password;
                        localStorage.setItem('user', JSON.stringify(response.data));
                } else {
                        alert('Invalid email or password.');
                }
        };

        return (
                <div class="login-section">
                        <div class="login-header">
                                <div class="login-title">Welcome to</div>
                                <div class="login-logo">
                                        <img class="login-logo-img" src="arrows.png"></img>
                                        <span class="login-logo-text">takeoff</span>
                                </div>
                        </div>
                        <div class="login-container">
                                <form onSubmit={handleLogin}>
                                        <LoginInput type="email" handler={setEmail} />
                                        <LoginInput type="password" handler={setPassword} />
                                        <button class="login-btn" type="submit">Login</button>
                                </form>

                        </div>
                </div >
        );
};

export default Login;

