const express = require('express');
const updateStudentRouter = express.Router();
const Student = require('../models/students');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

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

// Update Student Details
updateStudentRouter.post('/:id', upload,  async (req, res) => {
    try {
        const urlID = req.params.id;
        const student = await Student.findById(urlID).exec();

        let new_image = req.body.old_image;
        let isDataChanged = false;

        if (req.file) {
            new_image = req.file.filename;
        
            try {
                const oldImagePath = path.join(__dirname, '../uploads/' + req.body.old_image);
                fs.unlinkSync(oldImagePath);
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log('File does not exist:', error.message);
                } else {
                    console.error('Error deleting file:', error.message);
                }
            }
        }
        
        const updatedDetails = {
            name: req.body.name,
            stack: req.body.stack,
            github: req.body.github,
            linkedin: req.body.linkedin,
            twitter: req.body.twitter,
            portfolio: req.body.portfolio,
            profileText: req.body.profileText,
            image: new_image,

        };

        let changeCondition = updatedDetails.name !== student.name ||
                                updatedDetails.stack !== student.stack ||
                                updatedDetails.github !== student.github ||
                                updatedDetails.linkedin !== student.linkedin ||
                                updatedDetails.twitter !== student.twitter ||
                                updatedDetails.portfolio !== student.portfolio ||
                                updatedDetails.profileText !== student.profileText ||
                                updatedDetails.image !== student.image;

        if (changeCondition) {
            isDataChanged = true;
        }

        const updatedStudent = await Student.findByIdAndUpdate(urlID, updatedDetails, {new: true});

        if (!updatedStudent) {
            res.json({ message: 'Student Not Found', type: 'danger' });
            return;
        }

        if (isDataChanged) {
            req.session.message = {
                type: 'success',
                message: `${student.name} Details Updated Successfully!`
            };
            res.redirect('/dashboard');
        } else {
            req.session.message = {
                type: 'info',
                message: `No change was made to ${student.name}`
            };
            res.redirect('/dashboard');
        }

    } catch (error) {
        res.redirect('/')
    }
})

module.exports = updateStudentRouter;