const mongoose = require('mongoose');

const profCalendarSchema = mongoose.Schema({
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
    seances: {
        type: Object
    }

});

module.exports = mongoose.model('ProfCalendar', profCalendarSchema);