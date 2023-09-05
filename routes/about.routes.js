const express = require('express');
const aboutRouter = express.Router();

// About Route
aboutRouter.get('/', (req, res) => {
    const navLinks = [
        { link_name: 'Home', url: '/' },
        { link_name: 'Login', url: '/login' },
        { link_name: 'About', url: '/about' }
    ]

    res.render("about", {
        title: "About AltSchool'23",
        navLinks: navLinks
    })
});

module.exports = aboutRouter;