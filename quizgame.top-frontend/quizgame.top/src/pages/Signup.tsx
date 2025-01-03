import '../assets/css/Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App } from 'antd';

const Signup = () => {
    const signUpEndPoint: string = 'https://localhost:7025/user/signup/';
  //const loginEndPoint: string = 'https://api.quizgame.top/user/signup/';
  
    const regex: RegExp = /^[a-zA-Z0-9-_]+$/;
    const context = useQuizGameContext();
  
    const { message } = App.useApp();
  
    const navigate = useNavigate();
    const loggedIn: boolean = context.username != '';
  
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
  
      message.info('You have been logged out');
      //context.setUsername('');
    };
  
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
      
      fetch(signUpEndPoint, {method: "POST",
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
        //setUser(data.username);
        navigate('/');
      })
      .catch((err: Error) => {
        message.error(err.message);
      });
    };
  
  return (
    <div className='signup-container'>
      <div className="signup-inner-container">

        <form onSubmit={logOut} className={`logout-form ${loggedIn}`}>
          <div className='message' >You are already logged in as: <b>{context.username}</b></div>
          <button type='submit' className='signup-button'>
            Log Out
          </button>
        </form>
        <form onSubmit={handleSubmit} className={`signup-form ${loggedIn}`}>
        <div className={`signup-message ${messageClass}`}>{validationError}</div>
        <div className='signup-field'>
          <label htmlFor='username' className='signup-label'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='signup-input'
            maxLength={10}
          />
        </div>

        <div className='signup-field'>
          <label htmlFor='password' className='signup-label'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='signup-input'
            maxLength={20}
          />
        </div>
        <button type='submit' className='signup-button'>
          Sign Up
        </button>
      </form>
      </div> 
      <div className={`signup-login ${loggedIn}`}> Already have an account? <Link to='/login'><u>Log In</u></Link></div>
    </div> 
  );
}

export default Signup;
