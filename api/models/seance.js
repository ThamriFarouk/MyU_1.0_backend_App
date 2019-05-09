const mongoose = require('mongoose');

const SeanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: String,
    },
    classe: {
        type: String,
    },
    professor: {
        type: String,
    },
    course: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    nbAbsences: {
        type: Number,
    }
});

module.exports = mongoose.model('Seance', SeanceSchema);