const mongoose = require('mongoose');

const profSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

});

module.exports = mongoose.model('Prof', profSchema);