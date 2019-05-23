const mongoose = require('mongoose');

const schoolPhotoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    path: {
        type: String
    },
    caption: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
});

module.exports = mongoose.model('SchoolPhoto', schoolPhotoSchema);