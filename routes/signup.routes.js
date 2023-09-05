const express = require('express');
const signUpRouter = express.Router();
const Student = require('../models/students');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session'); // Add express-session for session management

// Upload Image
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    },
});

var upload = multer({
    storage: storage,
}).single("image");

// Add a New Student
signUpRouter.post('/', upload, async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newStudent = new Student({
            name: req.body.name,
            stack: req.body.stack,
            github: req.body.github,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter,
            portfolio: req.body.portfolio,
            profileText: req.body.profileText,
            image: req.file.filename,
            email: req.body.email,
            password: hashedPassword
        });

        await newStudent.save();

        req.session.message = {
            type: "success",
            message: `${newStudent.name} Added Successfully!`
        };
        res.redirect('/');

    } catch (error) {
        res.json({ message: error.message, type: 'danger' })
    }
});

signUpRouter.get('/', (req, res) => {
    const navLinks = [
        { link_name: 'Home', url: '/' },
        { link_name: 'Login', url: '/login' },
        { link_name: 'About', url: '/about' }
    ]

    res.render('signup', { 
        title: "Sign Up!",
        navLinks: navLinks
     });
});

module.exports = signUpRouter;