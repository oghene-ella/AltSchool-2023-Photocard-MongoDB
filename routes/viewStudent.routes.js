const express = require('express');
const viewStudentRouter = express.Router();
const Student = require('../models/students');

// Display the Details of Each Student
viewStudentRouter.get('/:id', async (req, res) => {
    try {
        const urlID = req.params.id;
        const student = await Student.findById(urlID).exec();

        if (!student) {
            res.json({ message: 'Student Not Found!', type: 'danger' });
            return;
        }

        const navLinks = [
            { link_name: 'Home', url: '/' },
            { link_name: 'Login', url: '/login' },
            { link_name: 'About', url: '/about' }
        ]

        res.render('view_student', { 
            title: 'Student Details', student,
            navLinks: navLinks
         });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = viewStudentRouter;