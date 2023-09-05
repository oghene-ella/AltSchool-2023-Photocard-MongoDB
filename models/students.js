const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true,
        enum: ['Backend Engineer', 'Cloud Engineer', 'Frontend Engineer', 'Fullstack Engineer']
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    portfolio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    profileText: {
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Students', studentSchema);