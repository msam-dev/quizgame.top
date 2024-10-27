import '../css/Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-content">
        <div className='navbar-logo-container'>
          <a href='/'><img className='navbar-logo' src='src\assets\images\quizgame-title-LD.png'/></a>
        </div>
        <div className='navbar-settings-container'>
          <a className='navbar-settings' href='/world-flag-quiz-mc'>Quiz</a>
          <a className='navbar-settings' href='/test'>API</a>
          <a className='navbar-settings' href='/settings'>Settings</a>
        </div>
      </div>
    </div> 
  );
}

export default Navbar;