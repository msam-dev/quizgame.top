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
  const context = useQuizGameContext();
  const { message } = App.useApp();
  const [open, setOpen] = useState<boolean>(false);

  const logout = () => {
    setOpen(false);
    navigate('/');
    context.logOut();
    message.info('You have been logged out');
  }

  return (
    <div className='navbar-container'>
      <div className='navbar-content'>
        <div className='navbar-logo-container'>
          <Link to='/'><img className='navbar-logo' src={title}/></Link>
        </div>
        <div className='navbar-settings-icon-container'>
          <AiTwotoneSetting className='navbar-settings-icon' onClick={() => setOpen(true)}/>
        </div> 
      </div>
      <div className={`navbar-settings-drawer-container ${open}`}>
        <div className={`navbar-settings-drawer-overlay ${open}`} onClick={() => setOpen(false)}></div>
        <div className={`navbar-settings-drawer ${open}`}>
          <div className='navbar-settings-header'>
            <div className='navbar-settings-title'></div> 
            <AiOutlineClose className='navbar-settings-close-button' onClick={() => setOpen(false)}/>
          </div>
          <div className='navbar-settings-body'>
            <div className={`navbar-settings-user-auth`}>
              <Link to='/' className={`navbar-settings-logout ${context.loggedIn}`} onClick={logout}>Log out</Link>
              <Link to='/login' className={`navbar-settings-login ${context.loggedIn}`} onClick={() => setOpen(false)}>Log in</Link>
              <Link to='/signup' className={`navbar-settings-signup ${context.loggedIn}`} onClick={() => setOpen(false)}>Sign up</Link>
            </div>
          </div>
        </div>
      </div> 
    </div> 
  );
}

export default Navbar;