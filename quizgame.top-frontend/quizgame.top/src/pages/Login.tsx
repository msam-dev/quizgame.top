import { Link } from 'react-router-dom';
import '../assets/css/Login.scss';
import { useState } from 'react';

const Login = () => {
  
  const url: string = 'https://localhost:7025';
  //const url: string = 'https://api.quizgame.top';

  const loginEndPoint: string = url+'/user/login/';
  const regex: RegExp = /^[a-zA-Z0-9-_]+$/;

  const [username, setUsername]         = useState<string>('');
  const [password, setPassword]         = useState<string>('');
  const [message, setMessage]           = useState<string>('');  
  const [messageClass, setMessageClass] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stops page from reloading

    // validation 
    if (!username && !password) {
      setError('Please enter Username and Password');
      return;
    }
    if (!username) {
      setError('Username cannot be blank');
      return;
    }
    if (!regex.test(username)) {
      setError("Username can only contain letters, numbers, hyphens, and underscores.");
      return;
    } 
    if (!password) {
      setError('Password cannot be blank');
      return;
    }    

    setError('');
    requestLogin();
  };

  const requestLogin = () => {

    fetch(loginEndPoint, {method: "POST",
      headers: { "Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => {
      setSuccess("Login successful! Hello, "+ data.username);
      console.log(data);
    })
    .catch((err) => {
      setError(err.message);
    });
  };

  const setError = (errorMessage: string) => {
    setMessage(errorMessage);
    setMessageClass('error');
  }

  const setSuccess = (sucessMessage: string) => {
    setMessage(sucessMessage);
    setMessageClass('success');
  }

  return (
    <div className='login-container'>
      <div className='login-inner-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <div className={`login-message ${messageClass}`}>{message}</div>
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