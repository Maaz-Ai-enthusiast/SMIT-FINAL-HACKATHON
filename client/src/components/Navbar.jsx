import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from './Button'; // Import the Button component

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex justify-between items-center h-[86px] w-full mx-auto px-5 md:px-10 rounded-[8px] font-sans">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/">
              <p className="text-3xl font-semibold text-deep-blue">Connectify</p>
            </Link>
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-5 lg:gap-8">
            <div className="flex items-center gap-4 lg:gap-6 text-deep-blue text-xs md:text-sm lg:text-base whitespace-nowrap">
              <Link to="/">Home</Link>
              <Link to="/events">Events</Link>
              <Link to="/create">Create Event</Link>
              <Link to="/profile">Profile</Link>
            </div>

            <div className="flex items-center gap-3 lg:gap-5">
              <Link to="/login">
                <Button
                  className="bg-deep-blue text-white px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 text-xs md:text-sm lg:text-base rounded-full whitespace-nowrap"
                  title="Login"
                />
              </Link>
              <Link to="/signup">
                <Button
                  className="text-deep-blue px-3 py-1 md:px-4 md:py-2 lg:px-5 lg:py-3 text-xs md:text-sm lg:text-base rounded-full border border-deep-blue whitespace-nowrap"
                  title="Sign Up"
                />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button onClick={toggleMenu} className="text-deep-blue text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/events" onClick={toggleMenu}>
            Events
          </Link>
          <Link to="/create" onClick={toggleMenu}>
            Create Event
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            Profile
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Link to="/login" onClick={toggleMenu}>
            <Button
              className="bg-deep-blue text-white px-4 py-2 rounded-full w-full"
              title="Login"
            />
          </Link>
          <Link to="/signup" onClick={toggleMenu}>
            <Button
              className="text-deep-blue px-4 py-2 rounded-full border border-deep-blue w-full"
              title="Sign Up"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
