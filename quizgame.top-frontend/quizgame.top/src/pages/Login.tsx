import '../assets/css/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuizGameContext } from '../assets/components/QuizGameContext';
import { App } from 'antd';

const Login = () => {
  
  const loginEndPoint: string = 'https://localhost:7025/user/login/';
//const loginEndPoint: string = 'https://api.quizgame.top/user/login/';

  const regex: RegExp = /^[a-zA-Z0-9-_]+$/;
  const context = useQuizGameContext();

  const { message } = App.useApp();

  const navigate = useNavigate();
  const loggedIn: boolean = context.username != '';

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

    message.info('You have been logged out');
    context.clearUser();
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
    const controller = new AbortController(); 
    const timeout = setTimeout(() => { controller.abort(); }, 5000); // 5 second timeout

    message.loading('Logging in, please wait...', 0);
    setLoading(true);
    
    fetch(loginEndPoint, {
      method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    })
    .then((response) => {
      if (response.ok) { 
        return response.json(); 
      }else{
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Login failed");
        });
      }
    })
    .then((data) => {
      clearTimeout(timeout); 
      setLoading(false);
      message.destroy(); // clears the loading message
      message.success('Login successful! Hello, '+ data.username);
      context.setUser(data.username, data.token);
      navigate('/');
    })
    .catch((err: Error) => {
      clearTimeout(timeout); 
      setLoading(false);
      message.destroy(); 
      message.error(err.name==="AbortError" ? "Request timed out. Please try again." : err.message);
    });
  };

  return (
    <div className='login-container'>
      <div className='login-inner-container'>

        <form onSubmit={logOut} className={`logout-form ${loggedIn}`}>
          <div className='message' >You are already logged in as: <b>{context.username}</b></div>
          <button type='submit' className='login-button'>
            Log Out
          </button>
        </form>

        <form onSubmit={handleSubmit} className={`login-form ${loggedIn}`}>
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
        <button type='submit' className={`login-button ${loading}`}>
          Log in
        </button>
      </form>
      </div> 
      <div className={`login-signup ${loggedIn}`}> Don't have an account? <Link to='/signup'><u>Sign Up</u></Link></div>
    </div> 
  );
}

export default Login;