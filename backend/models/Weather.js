const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  timestamp: Date,
  temperature: Number,
  humidity: Number,
  pressure: Number
});

module.exports = mongoose.model('Weather', weatherSchema);
