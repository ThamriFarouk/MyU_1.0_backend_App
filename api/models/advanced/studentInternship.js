const mongoose = require('mongoose');

const studentInternshipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    internshipType: {
        type: String,
    },
    internshipNature: {
        type: String,
    },
    endDate: {
        type: String,
    },
    organisation: {
        type: String,
    },
    students: {
        type: Object,
    },
    internshipTerritory: {
        type: String,
    },
    published: {
        type: String,
    },
    title: {
        type: String,
    },
    professors: {
        type: Object,
    },
    schoolYear: {
        type: String,
    },
    meetings: {
        type: Object,
    },
    internshipUnit: {
        type: String,
    },
    startDate: {
        type: String,
    },
    supervisors: {
        type: Object,
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model('StudentInternship', studentInternshipSchema);