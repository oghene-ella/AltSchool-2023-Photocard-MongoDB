const express = require('express');
const logoutRouter = express.Router();
const session = require('express-session'); // Add express-session for session management

// Logout Route
logoutRouter.get('/', (req, res) => {
    // Destroy the session to log out the student
    req.session.destroy((error) => {
        if (error) {
            // Handle session destruction error
            res.json({ message: error.message });
        } else {
            // Redirect to the login page after logout
            res.redirect('/');
        }
    });
});

module.exports = logoutRouter;