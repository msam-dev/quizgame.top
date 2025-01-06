import '../assets/css/Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App, Modal  } from 'antd';

const Signup = () => {
  
  const signUpEndPoint: string = 'https://localhost:7025/user/signup/';
//const signUpEndPoint: string = 'https://api.quizgame.top/user/signup/';

  const regex: RegExp = /^[a-zA-Z0-9_]+$/;
  const context = useQuizGameContext();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const [loading, setLoading]                 = useState<boolean>(false);
  const [username, setUsername]               = useState<string>('');
  const [password, setPassword]               = useState<string>('');
  const [messageClass, setMessageClass]       = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');  

  useEffect(() => { if(!context.loggedIn) warn(); }, []);
  
  const warn = () => {
    Modal.warning({ 
      title: 'Warning',
      content: 'Steps have been taken to protect your data, but it is highly recommended you cre  te a completely new password for this account. Do not use passwords you\'ve used on other platforms.',
      okText: 'I Understand',
    });
  }
  
  const setError = (errorMessage: string) => {
    setValidationError(errorMessage);
    setMessageClass('error');
  };

  const logOut = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading
    context.logOut();
    message.info('You have been logged out');
  };

  /**
   * Handles signup form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading

    // validation 
    if (!username || !password) {
      setError('Please enter Username and Password');
      return;
    }
    if (!regex.test(username)) {
      setError('Usernames can only contain letters, numbers, and underscores.');
      return;
    } 

    setError('');
    requestSignup();
  };

  /**
   * Contacts the signup API endpoint and handles the response
   */
  const requestSignup = () => {
    message.loading('Signing up, please wait...');
    
    fetch(signUpEndPoint, {method: 'POST',
      headers: { 'Content-Type': 'application/json',},
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      if (response.ok) return response.json(); 

      return response.json().then((errorData) => {
        throw new Error(errorData.message || 'Signup failed');
      });
    })
    .then((data) => {
      message.success('Sign up successful! Welcome, '+ data.username);
      navigate('/');
    })
    .catch((err: Error) => {
      message.error(err.message);
    });
  };
  
  return (
    <>
      <div className='signup-container'>
        <div className='signup-inner-container'>
          <form onSubmit={logOut} className={`logout-form ${context.loggedIn}`}>
            <div className='message' >You are already logged in as: <b>{context.username}</b></div>
            <button type='submit' className='signup-button'>
              Log Out
            </button>
          </form>
          <form onSubmit={handleSubmit} className={`signup-form ${context.loggedIn}`}>
            <div className='signup-title'>Create a New User </div>
            <div className={`signup-message ${messageClass}`}>{validationError}</div>
            <div className='signup-field'>
              <label htmlFor='username' className='signup-label'>Username:</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='signup-input'
                maxLength={15}
                minLength={3}
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
                minLength={8}
              />
            </div>
            <button type='submit' className='signup-button'>
              Sign Up
            </button>
          </form>
        </div> 
        <div className={`signup-login ${context.loggedIn}`}> Already have an account? <Link to='/login'><u>Log In</u></Link></div>
      </div> 
    </>
  );
}

export default Signup;
