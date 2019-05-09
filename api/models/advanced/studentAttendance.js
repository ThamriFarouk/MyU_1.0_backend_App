const mongoose = require('mongoose');

const studentAttendanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    seances: {
        type: Object
    },
    nbAbsences: {
        type: Number
    },
    nbAbsencesByCourse: {
        type: Object
    }

});

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);