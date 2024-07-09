const Message = require('../models/message')

exports.index = (req, res) => {
  Message.find()
    .exec()
    .then(messages => {
      res.json(messages)
    })
    .catch(error => {
      res.status(500).json({ msg : 'Error retrieving messages'})
    })
}

exports.create = (req, res) => {
  const connectedUserId = req.user.id;

  new Message({
    text: req.body.text,
    author: connectedUserId,
    channel: req.body.channel
  })
    .save()
    .then((message) => {
      res.status(200).json({ msg: 'Message created', message })
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}
