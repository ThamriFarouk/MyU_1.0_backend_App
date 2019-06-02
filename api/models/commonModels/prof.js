const mongoose = require('mongoose');

const profSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classes: {
        type: Object,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    birthDate: {
        type: String,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    Nationality: {
        type: String,
        required: true
    },
    CIN: {
        type: String,
        required: true
    },
    PassportNumber: {
        type: String,
        required: true
    },
    SchoolName: {
        type: String,
        required: true
    },
    DepartmentsNames: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
});

module.exports = mongoose.model('Prof', profSchema);