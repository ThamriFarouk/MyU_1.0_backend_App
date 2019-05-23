const mongoose = require('mongoose');

const studentActuSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    cateorie: {
        type: String
    },
    content: {
        type: String
    },
    publisher: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    photo: {
        type: String
    },
    school: {
        type: String
    },
    department: {
        type: String
    },


});

module.exports = mongoose.model('StudentActu', studentActuSchema);