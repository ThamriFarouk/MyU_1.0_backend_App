const mongoose = require('mongoose');

const examCalendarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    schoolYear: {
        type: String,
        reuired: true
    },
    exams: {
        type: Object
    }

});

module.exports = mongoose.model('ExamCalendar', examCalendarSchema);