const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: { type: String, requires: true },
  description: { type: String, requires: true },
  duration: { type: Number, requires: true },
  date: { type: Date, requires: true }
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise