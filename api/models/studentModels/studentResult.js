const mongoose = require('mongoose');

const studentResultSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    average: {
        type: String,
    },
    classe: {
        type: String,
    },
    decision: {
        type: String,
    },
    avgBeforeInternship: {
        type: String,
    },
    session: {
        type: String,
    },
    schoolYear: {
        type: String,
    },
    type: {
        type: String,
    },
    mention: {
        type: String,
    },
});

module.exports = mongoose.model('StudentResult', studentResultSchema);