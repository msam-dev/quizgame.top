import '../assets/css/Login.scss';
import * as constants from '../Constants';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App } from 'antd';

const Login = () => {

  const context = useQuizGameContext();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const [loading, setLoading]                 = useState<boolean>(false);
  const [username, setUsername]               = useState<string>('');
  const [password, setPassword]               = useState<string>('');
  const [messageClass, setMessageClass]       = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');  

  const setError = (errorMessage: string) => {
    setValidationError(errorMessage);
    setMessageClass('error');
  };

  const logOut = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading
    context.logOut(true);
  };

  /**
   * Handles login form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading

    if(loading) return;

    if (!username || !password) {
      setError('Please enter Username and Password');
      return;
    }
    if (!constants.userRegex.test(username)) {
      setError('Username can only contain letters, numbers, and underscores.');
      return;
    } 

    setError('');
    requestLogin();
  };

  /**
   * Contacts the login API endpoint and handles the response
   */
  const requestLogin = () => {
    const controller = new AbortController(); 
    const timeout = setTimeout(() => { controller.abort(); }, 5000); // 5 second timeout

    message.loading('Logging in, please wait...', 0);
    setLoading(true);
    
    fetch(constants.loginEndPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',},
      credentials: 'include',
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    })
    .then((response) => {
      if (response.ok) return response.json();
      
      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Login failed');
      });
    })
    .then((data) => {
      message.destroy(); // clears the loading message
      message.success('Login successful! Hello, '+ username);
      context.setUser(data.username, data.answerCount, data.correctCount, data.createdAt);
      navigate('/');
    })
    .catch((err: Error) => {
      message.destroy(); 
      message.error(err.name==='AbortError' ? 'Login request timed out. Please try again.' : err.message);
    })
    .finally(() => {
      clearTimeout(timeout); 
      setLoading(false);   
     });
  };

  return (
    <div className='login-container'>
      <div className='login-inner-container'>
        <form onSubmit={logOut} className={`logout-form ${context.loggedIn}`}>
          <div className='message' >You are already logged in as: <b>{context.username}</b></div>
          <button type='submit' className='login-button'>
            Log Out
          </button>
        </form>

        <form onSubmit={handleSubmit} className={`login-form ${context.loggedIn}`}>
        <div className={`login-message ${messageClass}`}>{validationError}</div>
        <div className='login-field'>
          <label htmlFor='username' className='login-label'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='login-input'
            maxLength={15}
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
            maxLength={30}
          />
        </div>
        <button type='submit' className={`login-button ${loading}`}>
          Log in
        </button>
      </form>
      </div> 
      <div className={`login-signup ${context.loggedIn}`}> Don't have an account? <Link to='/signup'><u>Sign Up</u></Link></div>
    </div> 
  );
}

export default Login;