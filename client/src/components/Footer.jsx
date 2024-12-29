import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[white] text-[#E3F2FD] py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start text-[#283593]">
  <Link to="/" className="text-3xl font-semibold text-deep-blue mb-4">
    Connectify
  </Link>
  <p className="text-sm text-deep-blue text-center sm:text-left">
    Your go-to platform for managing events, connecting with others, and staying up-to-date with exciting opportunities.
  </p>
</div>


          {/* Quick Links Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-xl font-semibold text-[#283593] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#283593] hover:text-black text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-[#283593] hover:text-black text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-[#283593] hover:text-black text-sm">
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-[#283593] hover:text-black text-sm">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#283593] hover:text-black text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-xl font-semibold text-[#283593] mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-black text-xl">
                <FaFacebook />
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-black text-xl">
                <FaTwitter />
              </Link>
              <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#283593] hover:text-black text-xl">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#B0BEC5] mt-8 pt-4 text-center text-sm">
          <p className="text-[#B0BEC5]">
            &copy; {new Date().getFullYear()} Connectify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
