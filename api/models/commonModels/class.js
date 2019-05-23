const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    departementName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Class', classSchema);