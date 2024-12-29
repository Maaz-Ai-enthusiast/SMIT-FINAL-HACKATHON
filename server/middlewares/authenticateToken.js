import jwt from 'jsonwebtoken';
import UserSignup from '../models/userSignupModel.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserSignup.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    console.log('User authenticated:', req.user); // Log user info
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
