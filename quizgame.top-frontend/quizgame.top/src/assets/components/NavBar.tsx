import '../css/Navbar.scss';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-content">
        <a className='navbar-link' href='/'> <img className='navbar-logo' src='src\assets\images\quizgame-title-LD.png'/></a>
        <a className='navbar-link' href='/settings'>Settings</a>
      </div>
    </div> 
  );
}

export default Navbar;