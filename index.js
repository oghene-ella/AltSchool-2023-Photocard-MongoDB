require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 54245;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Connection to DB
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db_connection = mongoose.connection;
db_connection.on('error', (error) => console.error(error));
db_connection.once('open', () => console.log("Connected to Database"));

// App Configuration
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(session({ 
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
 })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// View Setup
app.set('view engine', 'ejs');

// Route Prefix
app.use("", routes)

// Not Found Route
app.get('*', (req, res) => {
    const navLinks = [
        { link_name: 'Home', url: '/' },
        { link_name: 'Login', url: '/login' },
        { link_name: 'About', url: '/about' }
    ]

    res.render("404", {
        title: "404 Not Found!",
        student: req.session.student,
        navLinks: navLinks
    });
})

app.listen(PORT, () => {
    console.log(`Server is on using PORT ${PORT}`);
})