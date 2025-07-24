// controllers/lookupController.js

/**
 * Fetches all genders from the emp_genders table.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} pool - MySQL connection pool.
 */
exports.getAllGenders = async (req, res, pool) => {
    try {
        const [rows] = await pool.execute("SELECT id, name FROM emp_genders");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching genders:', error);
        res.status(500).json({ error: 'Failed to fetch genders', details: error.message });
    }
};

/**
 * Fetches all departments from the emp_departments table.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} pool - MySQL connection pool.
 */
exports.getAllDepartments = async (req, res, pool) => {
    try {
        const [rows] = await pool.execute("SELECT id, name FROM emp_departments");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Failed to fetch departments', details: error.message });
    }
};

/**
 * Fetches all designations from the emp_designations table.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} pool - MySQL connection pool.
 */
exports.getAllDesignations = async (req, res, pool) => {
    try {
        const [rows] = await pool.execute("SELECT id, name FROM emp_designations");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching designations:', error);
        res.status(500).json({ error: 'Failed to fetch designations', details: error.message });
    }
};

/**
 * Fetches all roles from the emp_roles table.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {object} pool - MySQL connection pool.
 */
exports.getAllRoles = async (req, res, pool) => {
    try {
        const [rows] = await pool.execute("SELECT id, name FROM emp_roles");
        res.json(rows);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Failed to fetch roles', details: error.message });
    }
};
