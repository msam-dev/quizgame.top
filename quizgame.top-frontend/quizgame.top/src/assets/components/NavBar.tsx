import '../css/Navbar.scss';
import title from '../images/quizgame-title-LD.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiTwotoneSetting } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useQuizGameContext } from './QuizGameContext';
import { App } from 'antd';

const Navbar = () => {
  const navigate = useNavigate();

  const { message } = App.useApp();

  const username = useQuizGameContext().username;
  const setUsername = useQuizGameContext().setUsername;
  const [open, setOpen] = useState<boolean>(false);
  const loggedIn: boolean = username != '';

  const openSettings = () => {
    setOpen(true);
  };

  const closeSettings = () => {
    setOpen(false);
  };

  const logout = () => {
    closeSettings();
    navigate('/');
    setUsername('');
    message.info('You have been logged out');
  }

  return (
    <div className='navbar-container'>
      <div className='navbar-content'>
        <div className='navbar-logo-container'>
          <Link to='/'><img className='navbar-logo' src={title}/></Link>
        </div>
        <div className='navbar-settings-icon-container'>
          <AiTwotoneSetting className='navbar-settings-icon' onClick={openSettings}/>
        </div> 
      </div>
      <div className={`navbar-settings-drawer-container ${open}`}>
        <div className={`navbar-settings-drawer-overlay ${open}`} onClick={closeSettings}></div>
        <div className={`navbar-settings-drawer ${open}`}>
          <div className='navbar-settings-header'>
            <div className='navbar-settings-title'></div> 
            <AiOutlineClose className='navbar-settings-close-button' onClick={closeSettings}/>
          </div>
          <div className='navbar-settings-body'>
            <div className={`navbar-settings-user-auth`}>
              <Link to='/' className={`navbar-settings-logout ${loggedIn}`} onClick={logout}>Log out</Link>
              <Link to='/login' className={`navbar-settings-login ${loggedIn}`} onClick={closeSettings}>Log in</Link>
              <Link to='/signup' className={`navbar-settings-signup ${loggedIn}`} onClick={closeSettings}>Sign up</Link>
            </div>
          </div>
        </div>
      </div> 
    </div> 
  );
}

export default Navbar;