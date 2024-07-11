const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  photo: { type: String, default: '/public/images/avatar.jpg'},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true},
  date: { type: Date, default: Date.now },
  pseudo: { type: String, required:true},
})

mongoose.plugin(muv)

module.exports = mongoose.model('user', userSchema)
