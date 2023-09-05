const express = require('express');
const homeRouter = express.Router();
const Student = require('../models/students');

// Get All Students from Database
homeRouter.get('/', async (req, res) => {
    try {
        const students = await Student.find().exec();

        const navLinks = [
            { link_name: 'Home', url: '/' },
            { link_name: 'Login', url: '/login' },
            { link_name: 'About', url: '/about' }
        ]

        res.render("index", {
            title: "AltSchool'23",
            students: students,
            navLinks: navLinks
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = homeRouter;