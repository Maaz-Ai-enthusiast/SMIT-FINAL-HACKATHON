import { Router } from "express";
import { createEvent, deleteEvent, getUserEvents } from "../controllers/eventController.js";
import { authenticateUser } from "../middlewares/authenticateToken.js";

const eventRoutes = Router();

// Route for creating an event
eventRoutes.post("/createEvent", authenticateUser, createEvent);

// Route for getting events created by the logged-in user
eventRoutes.post("/getUserEvents", authenticateUser, getUserEvents);
// eventRoutes.delete("/deleteEvent/:eventId", authenticateUser, deleteEvent);



export default eventRoutes;
