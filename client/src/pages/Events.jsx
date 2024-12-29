import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    visibility: "All",
    date: "All",
  });

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("token"); // Get token from the cookie
        if (!token) {
          setError("You must be logged in to view events.");
          setLoading(false);
          return;
        }

        console.log("Token:", token); // Log token for debugging

        const response = await axios.post("http://localhost:5000/events/getUserEvents", {
          token, // Send token in the body
        });

        if (response.status === 200) {
          console.log("Fetched events:", response.data.events); // Log fetched events
          setEvents(response.data.events);
          setFilteredEvents(response.data.events); // Initially show all events
        } else {
          setError("Error fetching events. Please try again later.");
        }
      } catch (err) {
        // Log the error details for better debugging
        console.error("Error fetching events:", err.response ? err.response.data : err.message);
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on the selected filters
  useEffect(() => {
    let filtered = events;

    // Log event visibility to see if it matches expectations
    console.log("Filtering events:", events);

    // Filter by visibility
    if (filter.visibility !== "All") {
      console.log("Filtering by visibility:", filter.visibility);
      filtered = filtered.filter(event =>
        event.visibility && event.visibility.toLowerCase().trim() === filter.visibility.toLowerCase().trim()
      );
    }

    // Filter by date (upcoming vs past)
    if (filter.date !== "All") {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return filter.date === "Upcoming" ? eventDate >= now : eventDate < now;
      });
    }

    setFilteredEvents(filtered);
  }, [filter, events]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <h2 className="text-xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Events</h1>
      
      {/* Filter Controls */}
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="visibility" className="block text-gray-700">Visibility</label>
            <select
              id="visibility"
              name="visibility"
              value={filter.visibility}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700">Event Date</label>
            <select
              id="date"
              name="date"
              value={filter.date}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="All">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Past">Past</option>
            </select>
          </div>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500">Location: {event.location}</p>
              <p className="text-gray-500">Category: {event.category}</p>
              <p className={`text-sm mt-3 ${event.visibility === "Public" ? "text-green-500" : "text-blue-500"}`}>
                Visibility: {event.visibility}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
