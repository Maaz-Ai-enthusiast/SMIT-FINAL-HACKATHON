import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

          <div className="mb-6">
            <Button
              type="submit"
              className="bg-deep-blue text-white w-full py-3 rounded-full text-lg"
              title="Log In"
            />
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
