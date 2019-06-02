const mongoose = require('mongoose');

const profFeedSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  school: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  schoolYear: {
    type: String,
    required: true
  },
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
  feedImage: {
    type: String,
    required: true
  },
  link: {
    type: String
  }
});

module.exports = mongoose.model('ProfFeed', profFeedSchema);
