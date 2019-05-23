const mongoose = require('mongoose');

const studenEvalSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    note: {
        type: String,
    },
    unit: {
        type: String,
    },
    evalName: {
        type: String,
    },
    unitCoef: {
        type: Number,
    },
    courseCoef: {
        type: Number,
    },
    course: {
        type: String,
    },
    absent: {
        type: String,
    },
    redoublant: {
        type: String,
    },
});

module.exports = mongoose.model('StudentEval', studenEvalSchema);