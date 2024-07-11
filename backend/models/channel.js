const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {type: String},
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
})


module.exports = mongoose.model('channel', channelSchema)
