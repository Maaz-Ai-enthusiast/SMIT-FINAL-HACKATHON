import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './Button'; // Correctly import the Button component
import axios from 'axios';
import { toast } from 'react-toastify';

// Helper function to get token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Check if the token exists in cookies
    const token = getCookie('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in if token is found
    } else {
      setIsLoggedIn(false); // User is not logged in if token is not found
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });

      if (response.data.success) {
        // Clear the token cookie with the same options as when it was set
        document.cookie = "token=; Max-Age=0; path=/; secure=" + (process.env.NODE_ENV === "production") + "; sameSite=" + (process.env.NODE_ENV === "production" ? "none" : "strict") + ";";

        setIsLoggedIn(false); // Update the state
        navigate('/signup');  // Navigate to signup page
        toast.success("Logged out successfully");
      } else {
        toast.error("Logout failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Network error, try again later" + error.message);
    }
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-deep-blue border-b-2 border-deep-blue py-1" // Add border and padding to avoid shifting
      : "text-deep-blue"; // No underline for inactive links
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex justify-between items-center h-[86px] w-full mx-auto px-5 md:px-10 rounded-[8px] font-sans">
          <div className="flex-shrink-0">
            <Link to="/">
              <p className="text-3xl font-semibold text-deep-blue">Connectify</p>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-5 lg:gap-8">
            <div className="flex items-center gap-4 lg:gap-6 text-xs md:text-sm lg:text-base whitespace-nowrap">
              <Link to="/" className={getLinkClass("/")}>Home</Link>
              <Link to="/events" className={getLinkClass("/events")}>Events</Link>
              <Link to="/createEvent" className={getLinkClass("/createEvent")}>Create Event</Link>
            </div>

            <div className="flex items-center gap-3 lg:gap-5">
              <Link to={isLoggedIn ? '#' : '/login'}>
                <Button
                  className="bg-deep-blue text-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 text-xs md:text-sm lg:text-base rounded-full whitespace-nowrap"
                  title={isLoggedIn ? 'Logout' : 'Login'}
                  onClick={isLoggedIn ? logout : null} // Attach logout if logged in
                />
              </Link>
            </div>
          </div>

          <div className="flex lg:hidden">
            <button onClick={toggleMenu} className="text-deep-blue text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-[100vh] w-[91vw] bg-white p-5 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <Link to="/">
            <p className="text-deep-blue text-xl font-semibold">Connectify</p>
          </Link>
          <button onClick={toggleMenu} className="text-deep-blue text-2xl">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col items-center gap-5 text-deep-blue">
          <Link to="/" onClick={toggleMenu} className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/events" onClick={toggleMenu} className={getLinkClass("/events")}>
            Events
          </Link>
          <Link to="/createEvent" onClick={toggleMenu} className={getLinkClass("/createEvent")}>
            Create Event
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Link to={isLoggedIn ? '#' : '/login'} onClick={toggleMenu}>
            <Button
              className="bg-deep-blue text-white px-4 py-2 rounded-full w-full"
              title={isLoggedIn ? 'Logout' : 'Login'}
              onClick={isLoggedIn ? logout : null} // Attach logout if logged in
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
