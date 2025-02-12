import '../css/Navbar.scss';
import title from '../images/quizgame-title-LD.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiTwotoneSetting, AiOutlineClose } from 'react-icons/ai';
import { PiUserCircleDuotone } from "react-icons/pi";
import { useQuizGameContext } from './QuizGameContext';

const Navbar = () => {

  const navigate = useNavigate();
  const context = useQuizGameContext();
  const [open, setOpen] = useState<boolean>(false);

  const logout = () => {
    setOpen(false);
    navigate('/');
    context.logOut(true);
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
          <div className='navbar-settings-inner-container'>
            <div className={`navbar-settings-body ${context.loggedIn}`}>
              <div className='navbar-settings-title'><PiUserCircleDuotone className='navbar-settings-user-icon'/></div> 
              <div className='navbar-settings-title'>User Information </div> 
              <div className='navbar-settings-item-container'>
                <div className='navbar-settings-item-label'>Username:</div>
                <div className='navbar-settings-item-value'>{context.username}</div>
              </div>
              <div className='navbar-settings-item-container'>
                <div className='navbar-settings-item-label'>Score:</div>
                <div className='navbar-settings-item-value'>{context.score}</div>
              </div>
              <div className='navbar-settings-item-container'>
                <div className='navbar-settings-item-label'>Avg Accuracy:</div>
                <div className='navbar-settings-item-value'>{context.accuracy}</div>
              </div>
              <div className='navbar-settings-item-container'>
                <div className='navbar-settings-item-label'>Creation Date:</div>
                <div className='navbar-settings-item-value'>{context.creationDate}</div>
              </div>     
            </div>
            <div className={`navbar-settings-user-auth`}>
              <Link to='/login' className={`navbar-settings-login ${context.loggedIn}`} onClick={() => setOpen(false)}>Log in</Link>
              <Link to='/signup' className={`navbar-settings-signup ${context.loggedIn}`} onClick={() => setOpen(false)}>Sign up</Link>
              <Link to='/' className={`navbar-settings-logout ${context.loggedIn}`} onClick={logout}>Log out</Link>
            </div>
          </div>
        </div>
      </div> 
    </div> 
  );
}

export default Navbar;