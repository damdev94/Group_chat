const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'channel', required: true }
});

module.exports = mongoose.model('message', messageSchema);
