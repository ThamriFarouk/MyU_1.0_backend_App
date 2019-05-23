const mongoose = require('mongoose');

const profExamCalendarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prof: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prof',
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
    Seances: {
        type: Object
    }

});

module.exports = mongoose.model('ProfExamCalendar', profExamCalendarSchema);