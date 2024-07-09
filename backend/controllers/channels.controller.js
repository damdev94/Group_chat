const User = require('../models/user');
const Channel = require('../models/channel');


exports.index = (req, res) => {
  Channel.find()
    .exec()
    .then(channels => {
      res.json(channels)
    })
    .catch(error => {
      res.status(500).json({msg : 'Error retrieving channels'})
    })
}

exports.create = (req, res) => {
  const connectedUserId = req.user._id;

  new Channel({ name: req.body.name, members: [connectedUserId] })
    .save()
    .then((channel) => {
      console.log(channel);
      res.status(201).json({ msg: "channel created" })
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}
