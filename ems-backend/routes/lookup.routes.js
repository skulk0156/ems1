// routes/lookupRoutes.js

const express = require('express');
const lookupController = require('../controllers/lookup.controller'); // Import the new lookup controller

/**
 * Defines lookup-related API routes for dropdowns.
 * This function takes the MySQL connection pool as an argument
 * and returns a configured Express router.
 * @param {object} pool - The MySQL connection pool.
 * @returns {express.Router} The configured Express router.
 */
module.exports = (pool) => {
    const router = express.Router();

    // Routes for fetching dropdown data
    router.get('/genders', (req, res) => lookupController.getAllGenders(req, res, pool));
    router.get('/departments', (req, res) => lookupController.getAllDepartments(req, res, pool));
    router.get('/designations', (req, res) => lookupController.getAllDesignations(req, res, pool));
    router.get('/roles', (req, res) => lookupController.getAllRoles(req, res, pool));

    return router;
};
