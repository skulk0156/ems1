const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Login controller for EMS.
 * Expects JSON body: { user_id, password }
 * Returns JWT token and user info if authenticated.
 * @param {Pool} pool - MySQL connection pool
 */
const loginUser = (pool) => async (req, res) => {
  console.log('req.body:', req.body); // Debug incoming request body

  // Safely handle user_id: trim only if it's a string
  const rawUserId = req.body.user_id;
  const user_id = (typeof rawUserId === 'string') ? rawUserId.trim() : '';
  
  const password = req.body.password;

  if (!user_id || !password) {
    return res.status(400).json({ message: 'User ID and password are required.' });
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined!');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  let connection;
  try {
    connection = await pool.getConnection();

    const sql = `
      SELECT user_id, password_hash, role_id
      FROM emp_employees
      WHERE user_id = ? AND deleted_at IS NULL
      LIMIT 1
    `;
    const [rows] = await connection.execute(sql, [user_id]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid user ID or password.' });
    }

    const user = rows[0];

    // Ensure password_hash is a string for bcrypt.compare
    const storedHash = typeof user.password_hash === 'string'
      ? user.password_hash
      : user.password_hash.toString('utf8');

    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid user ID or password.' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        user_id: user.user_id,
        role_id: user.role_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { loginUser };
