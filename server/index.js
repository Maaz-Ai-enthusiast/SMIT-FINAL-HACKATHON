import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend URL
    credentials: true // Enable cookies to be sent with requests
  }));
app.use(cookieParser());

app.use("/users",authRoutes);

app.use("/events",eventRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);




