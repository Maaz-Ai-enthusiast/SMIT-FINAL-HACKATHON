import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from './../components/Loader'; 
import Cookies from 'js-cookie';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state

    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      const response = await axios.post('http://localhost:5000/users/logout', {}, { withCredentials: true });


      if (!response.ok) {
        // Attempt to parse the error if response is not OK
        const errorData = await response.json();
        setError(errorData.error || 'Invalid email or password');
        return;
      }

      // Handle successful response
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        setError('Error parsing response data');
        return;
      }

      if (data.success) {
        // Store the token securely in cookies
        Cookies.set('token', data.token, {
          expires: 7,
          path: '',
          secure: true, // Use secure in production
          sameSite: 'Strict', // CSRF protection
        });

        // Navigate to the dashboard or intended page
        navigate('/');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-light-gray overflow-hidden px-4 sm:px-6 md:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold text-deep-blue mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-deep-blue text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-cool-gray rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-deep-blue text-sm mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-cool-gray rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div className="mb-6">
            {loading ? (
              <Loader /> // Use your existing Loader component here
            ) : (
              <Button
                type="submit"
                className="w-full py-3 rounded-full text-lg bg-deep-blue text-white"
                title="Log In"
              />
            )}
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-deep-blue font-semibold">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
