const express = require('express');
const loginRouter = express.Router();

// Login: Get All Students from Database Though Login
loginRouter.get('/', (req, res) => {
    const navLinks = [
        { link_name: 'Home', url: '/' },
        { link_name: 'Login', url: '/login' },
        { link_name: 'About', url: '/about' }
    ]

    res.render("login", {
        title: "Login AltSchool'23",
        navLinks: navLinks
    })
});

module.exports = loginRouter;