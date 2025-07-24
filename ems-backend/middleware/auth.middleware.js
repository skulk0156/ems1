// ems-backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken'); // For JWT verification
require('dotenv').config(); // Ensure dotenv is loaded for process.env.JWT_SECRET

/**
 * Middleware to verify JWT token.
 * Attaches decoded user payload to req.user if token is valid.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
const verifyToken = (req, res, next) => {
  // Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in .env file!');
    return res.status(500).json({ message: 'Server configuration error: JWT secret missing.' });
  }

  // Get token from header (e.g., Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    // If no token is provided, return 401 Unauthorized
    return res.status(401).json({ message: 'Access Denied: No token provided.' });
  }

  try {
    // Verify the token using your secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user payload to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Token verification failed:', error.message);
    // If token is invalid or expired, return 403 Forbidden
    // The 'jwt malformed' error will be caught here
    return res.status(403).json({ message: 'Access Denied: Invalid or expired token.' });
  }
};

module.exports = {
  verifyToken
};
