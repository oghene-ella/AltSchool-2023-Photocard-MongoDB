const express = require('express');
const router = express.Router();

// Include Routes from Separate Files
const aboutRoute = require('./about.routes');
const dashboardRoute = require('./dashboard.routes');
const deleteRoute = require('./deleteStudent.routes');
const editRoute = require('./editStudent.routes');
const homeRoute = require('./home.routes');
const loginRoute = require('./login.routes');
const logoutRoute = require('./logout.routes');
const signUpRoute = require('./signup.routes');
const updateRoute = require('./updateStudent.routes');
const viewRoute = require('./viewStudent.routes');

// Define Routes
router.use('/about', aboutRoute);
router.use('/dashboard', dashboardRoute);
router.use('/delete_student', deleteRoute);
router.use('/edit_student', editRoute);
router.use('/', homeRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/signup', signUpRoute);
router.use('/update_student', updateRoute);
router.use('/view_student', viewRoute);

module.exports = router;