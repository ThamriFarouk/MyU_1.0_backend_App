const mongoose = require('mongoose');

const schoolCalendarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    school: {
        type: String,
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
    seances: {
        type: Object
    }

});

module.exports = mongoose.model('SchoolCalendar', schoolCalendarSchema);