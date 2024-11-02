import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

/**
 * Adding navbar to all pages
 */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This will render the content of the current route */}
    </>
  );
}

export default Layout;
