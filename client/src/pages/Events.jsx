import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "./../components/Loader"; // Import the Loader component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    visibility: "All",
    date: "All",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = Cookies.get("token");  // Get the token from cookies
        console.log("Token:", token); // Log the token to check it
        
        if (!token) {
          setError("You must be logged in to view events.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/events/getUserEvents", 
          { token } // Send token in the request body
        );

        if (response.status === 200) {
          setEvents(response.data.events);
          setFilteredEvents(response.data.events);
        } else {
          setError("Error fetching events. Please try again later.");
        }
      } catch (err) {
        console.error("Error fetching events:", err.response ? err.response.data : err.message);
        setError("Error fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (filter.visibility !== "All") {
      filtered = filtered.filter(event =>
        event.visibility.toLowerCase().trim() === filter.visibility.toLowerCase().trim()
      );
    }

    if (filter.date !== "All") {
      const now = new Date();
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return filter.date === "Upcoming" ? eventDate >= now : eventDate < now;
      });
    }

    setFilteredEvents(filtered);
  }, [filter, events]);

  const handleFilterClick = (type, value) => {
    setFilter(prev => ({ ...prev, [type]: value }));
  };

  if (loading) {
    return <Loader />;
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
      <div className="mb-6">
        <div className="flex space-x-4 justify-center mb-4">
          <button
            onClick={() => handleFilterClick("visibility", "All")}
            className={`px-4 py-2 rounded ${filter.visibility === "All" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterClick("visibility", "Public")}
            className={`px-4 py-2 rounded ${filter.visibility === "Public" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Public
          </button>
          <button
            onClick={() => handleFilterClick("visibility", "Private")}
            className={`px-4 py-2 rounded ${filter.visibility === "Private" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Private
          </button>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => handleFilterClick("date", "All")}
            className={`px-4 py-2 rounded ${filter.date === "All" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            All Dates
          </button>
          <button
            onClick={() => handleFilterClick("date", "Upcoming")}
            className={`px-4 py-2 rounded ${filter.date === "Upcoming" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleFilterClick("date", "Past")}
            className={`px-4 py-2 rounded ${filter.date === "Past" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-gray-600">No Events Created Yet</h2>
          <p className="text-gray-500 mb-4">It looks like you haven't created any events yet. Start by creating your first event!</p>
          <button
            onClick={() => navigate("/create-event")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Create Event
          </button>
        </div>
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
