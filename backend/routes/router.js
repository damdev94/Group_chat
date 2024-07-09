const express = require("express")
const passport = require('passport')
const router =  express.Router()
const usersController = require('../controllers/users.controller')
const channelsController = require('../controllers/channels.controller')
const messagesController = require('../controllers/messages.controller')

router.post('/signup', usersController.signUp)
router.post('/signin', usersController.signIn)

router.use(passport.authenticate("jwt", { session: false}))

router.get('/', (req, res) => {
  res.send('protected route')
})

router.get('/userinfos', usersController.index)

router.put('/userinfos/edit/:id', usersController.upload.single('photo'), usersController.update)

router.get('/chat', channelsController.index)
router.post('/chat', channelsController.create)

router.get('/chat/message', messagesController.index)
router.post('/chat/message', messagesController.create)

module.exports = router
