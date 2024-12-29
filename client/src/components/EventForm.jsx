import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toastify
import Button from './Button'; // Import the Button component
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify CSS
import Cookies from 'js-cookie'; // Import the js-cookie library

const EventForm = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    visibility: 'public', // 'public' or 'private'
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get token from cookies
      const token = Cookies.get('token');
  
      if (!token) {
        toast.error('Please login to create an event. OR create your account first');
        return;
      }
  
      // Send data and token to the backend via the request body
      const response = await axios.post('http://localhost:5000/events/createEvent', 
        { ...eventData, token }, // Send the event data and token together in the body
        {
          headers: {
            'Content-Type': 'application/json', // Ensure content-type is set to JSON
          },
        }
      );
  
      if (response.data.success) {
        toast.success('Event created successfully!');
        // Reset the form
        setEventData({
          title: '',
          description: '',
          date: '',
          location: '',
          category: '',
          visibility: 'public',
        });
      }
    } catch (error) {
      setError('Failed to create event. Please try again.');
      toast.error('Failed to create event. Please try again.' + error);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-lg my-8">
      <h2 className="text-3xl font-bold text-deep-blue mb-4">Create Event</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-semibold text-deep-blue">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-deep-blue">
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-semibold text-deep-blue">
            Event Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-semibold text-deep-blue">
            Event Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-semibold text-deep-blue">
            Event Category
          </label>
          <select
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          >
            <option value="tech">Tech</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="visibility" className="block text-sm font-semibold text-deep-blue">
            Event Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            value={eventData.visibility}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md border-cool-gray focus:outline-none focus:ring-2 focus:ring-deep-blue"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="flex justify-end">
          {/* Use the Button component */}
          <Button
            className="bg-[#283593] text-white hover:bg-[#5b67c8] focus:outline-none focus:ring-2 "
            title="Create Event"
          />
        </div>
      </form>
    </div>
  );
};

export default EventForm;
