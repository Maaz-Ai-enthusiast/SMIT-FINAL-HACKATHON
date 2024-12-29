import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., sending the data to the backend)
    console.log("Form submitted", { name, email, message });
  };

  return (
    <div className="bg-light-gray py-16 px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-deep-blue text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="text-cool-gray text-lg mb-8">
          We would love to hear from you! Please fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-deep-blue text-2xl font-semibold mb-4">Our Address</h2>
            <p className="text-cool-gray text-lg mb-4">
              1234 Event Management Street, Suite 567<br />
              Tech City, Country XYZ<br />
              Zip Code: 123456
            </p>

            <h2 className="text-deep-blue text-2xl font-semibold mb-4">Phone Number</h2>
            <p className="text-cool-gray text-lg mb-4">
              +1 234 567 8901
            </p>

            <h2 className="text-deep-blue text-2xl font-semibold mb-4">Follow Us</h2>
            <div className="flex justify-center space-x-6">
              <Link to="#" className="text-teal hover:text-vibrant-orange transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="text-teal hover:text-vibrant-orange transition duration-300">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="text-teal hover:text-vibrant-orange transition duration-300">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#" className="text-teal hover:text-vibrant-orange transition duration-300">
                <i className="fab fa-linkedin"></i>
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-deep-blue text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="block text-deep-blue text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-cool-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div className="mb-4">
                <label className="block text-deep-blue text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-cool-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                />
              </div>

              <div className="mb-4">
                <label className="block text-deep-blue text-sm font-semibold mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-cool-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-vibrant-orange text-white py-2 rounded-md hover:bg-teal transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-cool-gray text-lg">
            You can also reach out to us through the contact information above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
