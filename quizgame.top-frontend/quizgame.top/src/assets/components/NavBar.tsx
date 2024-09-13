import '../css/NavBar.scss';

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <div className="navbar-content">
        <a className='navbar-link' href='/'>Home</a>
        <a className='navbar-link' href='/settings'>Settings</a>
      </div>
    </div> 
  );
}

export default NavBar;