import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FcContacts, FcServices, FcHome, FcMenu} from 'react-icons/fc';
import { FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { Context } from '../context/userContext/Context';

function Navbar() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);

  const handleLogout = () => {
    // Perform logout logic
    dispatch({ type: 'LOGOUT' });
    navigate('/auth/login');
  };

  return (
    <div className="navbar">
      <h2 className="navbar-logo">UCHAGUZI</h2>
      <i className="navbar-toggle" onClick={() => setShowLinks(!showLinks)}>
        {showLinks ? <FcMenu />: <FcMenu />} 
      </i>
      <div className={`navbar-links ${showLinks ? " " : "hidden"}`}>
        <Link to="/" className="navbar-link">
          <FcHome />
          <span>Home</span>
        </Link>
        <Link to="/" className="navbar-link">
          <FcServices />
          <span>Services</span>
        </Link>
        <Link to="/" className="navbar-link">
          <FcContacts />
          <span>Contact</span>
        </Link>
        {user ? (
          <>
            <Link onClick={handleLogout} className="navbar-link">
              <FiLogOut />
              <span>Logout</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth/login" className="navbar-link">
              <FiLogIn />
              <span>Sign In</span>
            </Link>
            <Link to="/auth/register" className="navbar-link">
              <FiUserPlus />
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
