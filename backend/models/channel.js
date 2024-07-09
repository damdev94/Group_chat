const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
})


module.exports = mongoose.model('channel', channelSchema)
