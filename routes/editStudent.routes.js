const express = require('express');
const editStudentRouter = express.Router();
const Student = require('../models/students');
const session = require('express-session'); // Add express-session for session management

// Edit Student Information
editStudentRouter.get('/:id', async (req, res) =>{
    try {
        const urlID = req.params.id;
        const student = await Student.findById(urlID).exec();

        const navLinks = [
            { link_name: 'Home', url: '/' },
            { link_name: 'Logout', url: '/logout' },
            { link_name: 'About', url: '/about' }
        ]
    
        if (!student) {
            res.redirect('/');
        } else {
            res.render('edit_student', {
                title: `Edit ${student.name} Details!`,
                student: student,
                navLinks: navLinks
            });
        }
    } catch (error) {
        res.redirect('/');
    }
});

module.exports = editStudentRouter;