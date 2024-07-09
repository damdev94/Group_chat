const express =  require('express')
const server = express ()
const port = process.env.PORT || 5000
const router = require('./routes/router')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('./middlewares/auth')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB !'))

  mongoose.connection.on('connected', () => {
    mongoose.connection.db.collection('users').dropIndexes((err, result) => {
      if (err) {
        console.error('Error dropping indexes:', err);
      } else {
        console.log('Indexes dropped:', result);
      }
    });
  });

server.use(cors())
server.use(express.json())
server.use('/public', express.static(path.join(__dirname, 'public')))
server.use(router)

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
