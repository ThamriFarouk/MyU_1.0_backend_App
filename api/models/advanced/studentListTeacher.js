const mongoose = require('mongoose');

const studentListTeacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    professors: {
        type: Object,
    },
    className: {
        type: String
    }
});

module.exports = mongoose.model('StudentListTeacher', studentListTeacherSchema);