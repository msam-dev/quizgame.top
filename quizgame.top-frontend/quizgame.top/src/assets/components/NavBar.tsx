import '../css/Navbar.scss';

import title from '../images/quizgame-title-LD.png';
import { useState } from 'react';
import { AiTwotoneSetting } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";


const Navbar = () => {

  const [open, setOpen] = useState(false);

  const openSettings = () => {
    setOpen(true);
  };

  const closeSettings = () => {
    setOpen(false);
  };

  return (
    <div className='navbar-container'>
      <div className="navbar-content">
        <div className='navbar-logo-container'>
          <a href='/'><img className='navbar-logo' src={title}/></a>
        </div>
        <div className='navbar-settings-icon-container'>
          <AiTwotoneSetting className='navbar-settings-icon' onClick={openSettings}/>
        </div> 
      </div>
      <div className={`navbar-settings-drawer-container ${open}`}>
        <div className={`navbar-settings-drawer-overlay ${open}`}></div>
        <div className={`navbar-settings-drawer ${open}`}>
          <AiOutlineClose className='navbar-settings-close-button' onClick={closeSettings}/>
        </div>
      </div> 
    </div> 
  );
}

export default Navbar;