const mongoose = require('mongoose');

const studentDocumentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    categorie: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    documentImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('StudentDocument', studentDocumentSchema);