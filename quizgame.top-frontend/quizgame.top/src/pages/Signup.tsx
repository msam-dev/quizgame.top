import '../assets/css/Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App, Modal  } from 'antd';

const Signup = () => {
  
  const signUpEndPoint: string = 'https://localhost:7025/user/signup/';
//const signUpEndPoint: string = 'https://api.quizgame.top/user/signup/';

  const context = useQuizGameContext();

  const { message } = App.useApp();

  const navigate = useNavigate();

  const [loading, setLoading]                 = useState<boolean>(false);
  const [username, setUsername]               = useState<string>('');
  const [password, setPassword]               = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');  

  useEffect(() => { if(!context.loggedIn) warn(); }, []);
  
  const warn = () => {
    Modal.warning({ 
      title: 'Warning',
      content: 'Steps have been taken to protect your data, but it is highly recommended you create a completely new password for this account. Do not use passwords you\'ve used on other platforms.',
      okText: 'I Understand',
    });
  }

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
    if(loading) return;
    
    const errorMessage = validate();
    if(errorMessage != '')
    {
      setValidationError(errorMessage);
      return;
    }

    requestSignup();
  };

  /**
   * validates the form input
   */
  const validate = () => {
    if (!username || !password) return 'Please enter Username and Password';

    if (!RegExp(/^[a-zA-Z0-9_]+$/).test(username)) return 'Usernames can only contain letters, numbers, and underscores.';
    
    if (!RegExp( /[A-Z]/).test(password)) return "Password must contain at least one uppercase letter.";
    
    if (!RegExp(/[a-z]/).test(password)) return "Password must contain at least one lowercase letter.";
    
    if (!RegExp(/\d/).test(password)) return "Password must contain at least one number.";
    
    if (!RegExp(/[!@#$%^&*(),.?":{}|<>]/).test(password))  return "Password must contain at least one special character.";
    
    return '';
  }

  /**
   * Contacts the signup API endpoint and handles the response
   */
  const requestSignup = () => {
    const controller = new AbortController(); 
    const timeout = setTimeout(() => { controller.abort(); }, 5000); // 5 second timeout

    message.loading('Signing up, please wait...', 0);
    setLoading(true);
    
    fetch(signUpEndPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    })
    .then((response) => {
      if (response.ok) return response.json(); 

      return response.json().then((errorData) => {
        throw new Error(errorData.message || "Signup failed");
      });
    })
    .then((data) => {
      clearTimeout(timeout); 
      setLoading(false);
      message.destroy(); // clears the loading message
      message.success('Signup successful! Hello, '+ data.username);
      context.setUser(data.username, data.token);
      navigate('/');
    })
    .catch((err: Error) => {
      clearTimeout(timeout); 
      setLoading(false);
      message.destroy(); 
      message.error(err.name==="AbortError" ? "Signup request timed out. Please try again." : err.message);
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
            <div className={`signup-message`}>{validationError}</div>
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
                maxLength={30}
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
