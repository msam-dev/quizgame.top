import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Wrapper class for adding navbar to all pages
 */
function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* This will render the content of the current route */}
    </div>
  );
}

export default Layout;
