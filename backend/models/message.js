const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'channel', required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('message', messageSchema)
