const express = require('express');
const deleteStudentRouter = express.Router();
const Student = require('../models/students');
const path = require('path');
const fs = require('fs');
const session = require('express-session'); // Add express-session for session management

// Display a confirmation page before deleting the student
deleteStudentRouter.get('/:id', async (req, res) => {
    try {
        const urlID = req.params.id;
        const student = await Student.findById(urlID).exec();

        if (!student) {
            res.json({ message: 'Student Not Found!', type: 'danger' });
            return;
        }

        const navLinks = [
            { link_name: 'Home', url: '/' },
            { link_name: 'Logout', url: '/logout' },
            { link_name: 'About', url: '/about' }
        ]

        res.render('confirm_delete', { 
            title: 'Confirm Delete', student,
            navLinks: navLinks
         });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// Handle the actual deletion when the student confirms
deleteStudentRouter.post('/:id', async (req, res) => {
    try {
        const urlID = req.params.id;
        const student = await Student.findById(urlID).exec();
        const imagePath = path.join(__dirname, '../uploads', student.image);

        if (!student) {
            res.json({ message: 'Student Not Found!', type: 'danger' });
            return;
        }

        // Check if Student has an Image and Delete it
        if (student.image !== '') {
            try {
                fs.unlinkSync(imagePath);
            } catch (error) {
                console.log({ message: error });
            }
        }

        // Delete the Student from the Database Using Await
        await Student.findByIdAndRemove(urlID);

        req.session.message = {
            type: 'info',
            message: `${student.name} Details were Successfully Deleted!`
        };

        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = deleteStudentRouter;