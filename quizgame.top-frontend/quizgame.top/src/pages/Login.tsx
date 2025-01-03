import '../assets/css/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App } from 'antd';

const Login = () => {
  
  const loginEndPoint: string = 'https://localhost:7025/user/login/';
//const loginEndPoint: string = 'https://api.quizgame.top/user/login/';

  const regex: RegExp = /^[a-zA-Z0-9-_]+$/;

  const { message } = App.useApp();

  const navigate = useNavigate();
  const setUser = useQuizGameContext().setUsername;

  const [username, setUsername]               = useState<string>('');
  const [password, setPassword]               = useState<string>('');
  const [messageClass, setMessageClass]       = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');  

  const setError = (errorMessage: string) => {
    setValidationError(errorMessage);
    setMessageClass('error');
  }

  /**
   * Handles login form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading

    // validation 
    if (!username || !password) {
      setError('Please enter Username and Password');
      return;
    }
    if (!regex.test(username)) {
      setError("Username can only contain letters, numbers, hyphens, and underscores.");
      return;
    } 

    setError('');
    requestLogin();
  };

  /**
   * Contacts the login API endpoint and handles the response
   */
  const requestLogin = () => {
    message.loading('Logging in, please wait...');
    
    fetch(loginEndPoint, {method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      message.destroy(); // clears the loading message
      
      if (response.ok) { return response.json(); }

      return response.json().then((errorData) => {
        throw new Error(errorData.message || "Login failed");
      });
    })
    .then((data) => {
      message.success('Login successful! Hello, '+ data.username);
      setUser(data.username);
      navigate('/');
    })
    .catch((err: Error) => {
      message.error(err.message);
    });
  };

  return (
    <div className='login-container'>
      <div className='login-inner-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className={`login-message ${messageClass}`}>{validationError}</div>
        <div className='login-field'>
          <label htmlFor='username' className='login-label'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='login-input'
            maxLength={10}
          />
        </div>

        <div className='login-field'>
          <label htmlFor='password' className='login-label'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-input'
            maxLength={20}
          />
        </div>
        <button type='submit' className='login-button'>
          Log in
        </button>
      </form>
      </div> 
      <div className='login-signup'> Don't have an account? <Link to='/signup'>Sign Up</Link></div>
    </div> 
  );
}

export default Login;