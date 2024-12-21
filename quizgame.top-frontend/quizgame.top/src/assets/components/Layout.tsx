import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

/**
 * Adding navbar to all pages
 */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
}

export default Layout;
