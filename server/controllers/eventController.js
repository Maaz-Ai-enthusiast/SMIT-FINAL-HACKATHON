import Event from "../models/eventModel.js";

const createEvent = async (req, res) => {
  const { title, description, date, location, category, visibility, token } = req.body;

  if (!title || !description || !date || !location || !category || !visibility) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    console.log('Creating event with data:', req.body);

    // Ensure the user is authenticated (already checked in middleware)
    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      visibility,
      createdBy: req.user._id, // User ID from decoded token
    });

    await newEvent.save(); // Save the new event to the database

    console.log('Event created successfully:', newEvent);
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: newEvent,
    });
  } catch (error) {
    console.error('Error creating event:', error);  // Log the error to the console
    return res.status(500).json({ message: 'Server error while creating event' });
  }
};



const getUserEvents = async (req, res) => {
    try {
      // Ensure the user is authenticated (already checked in middleware)
      if (!req.user) {
        return res.status(401).json({ message: 'User not found.' });
      }
  
      // Find all events created by the logged-in user
      const userEvents = await Event.find({ createdBy: req.user._id });
  
      // If no events are found, return a message
      if (userEvents.length === 0) {
        return res.status(404).json({ message: 'No events found for this user.' });
      }
  
      // Return the list of events
      res.status(200).json({
        success: true,
        events: userEvents,
      });
    } catch (error) {
      console.error('Error fetching user events:', error);  // Log the error to the console
      return res.status(500).json({ message: 'Server error while fetching events' });
    }
  };


  const deleteEvent = async (req, res) => {
    const { id } = req.params; // Use 'id' to match the route param
  
    try {
      if (!req.user) {
        console.log("User not authenticated"); // Add logging
        return res.status(401).json({ message: 'User not authenticated.' });
      }
  
      // Log the eventId and user ID for debugging
      console.log("Deleting event with ID:", id);
      console.log("User ID:", req.user._id);
  
      // Find and delete the event created by the logged-in user
      const event = await Event.findOneAndDelete({
        _id: id,
        createdBy: req.user._id, // Ensure the user is the creator of the event
      });
  
      if (!event) {
        console.log("Event not found or not authorized"); // Log when event is not found
        return res.status(404).json({ message: 'Event not found or not authorized.' });
      }
  
      console.log("Event deleted successfully:", event); // Log successful deletion
      res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Server error while deleting event.' });
    }
  };
  
  
 

export { createEvent , getUserEvents , deleteEvent };

