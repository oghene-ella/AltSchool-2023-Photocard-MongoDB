const express = require('express');
const dashboardRouter = express.Router();
const Student = require('../models/students');
const bcrypt = require('bcrypt');
const session = require('express-session'); // Add express-session for session management

dashboardRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email }).exec();

        if (!student) {
            req.session.message = {
                type: 'danger',
                message: `Email does not exist in our database!`
            };

            return res.redirect('/login');
        }

        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            req.session.message = {
                type: 'danger',
                message: `Password is wrong!`
            };
            return res.redirect('/login');
        }

        req.session.student = student;

        res.redirect('/dashboard');
    } catch (error) {
        req.session.message = {
            type: 'danger',
            message: 'An error occurred. Please try again later.'
        };

        res.redirect('/login');
        // res.json({ message: error.message });
    }
});

// dashboardRouter.get('/', (req, res) => {
//     if (!req.session.student) {
//         return res.redirect('/login');
//     }

//     const navLinks = [
//         { link_name: 'Home', url: '/' },
//         { link_name: 'Logout', url: '/logout' },
//         { link_name: 'About', url: '/about' }
//     ]

//     res.render("dashboard", {
//         title: "Student Dashboard",
//         student: req.session.student,
//         navLinks: navLinks
//     });
// });

dashboardRouter.get('/', async(req, res) => {
    if (!req.session.student) {
        return res.redirect('/login');
    }

    try {
        const student = await Student.findById(req.session.student._id).exec();

        if (!student) {
            return res.redirect('/login');
        }

        const navLinks = [
            { link_name: 'Home', url: '/' },
            { link_name: 'Logout', url: '/logout' },
            { link_name: 'About', url: '/about' }
        ];

        res.render("dashboard", {
            title: `${student.name} Dashboard`,
            student: student,
            navLinks: navLinks
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            type: "danger",
            message: "Internal Server Error!"
         })
    }
})

module.exports = dashboardRouter;