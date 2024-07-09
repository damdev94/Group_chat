const passport = require('passport')
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const userModel = require('../models/user')
require('dotenv').config()

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  userModel.findById(jwtPayload.id)
    .then(user => {
      if (user) {
        return done(null, user)
      }
    })
    .catch(err => {
      return done(err, false)
    });
});

passport.use(strategy)

module.exports = passport
