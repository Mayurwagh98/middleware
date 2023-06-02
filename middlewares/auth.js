
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwt = require("jsonwebtoken")
const User = require("../models/User.model")


const jwtSecretKey = "blah"

const jwtOptions = {
    secretOrKey: jwtSecretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  passport.use(
    new JwtStrategy(jwtOptions, (payload, done) => {
        User.findById(payload.userID)
              .then(user => {
                
                if (user) {
                  // The user is authenticated
                  return done(null, user);
                }
                // User not found
                return done(null, false);
              })
              .catch(err => done(err, false));
    })
  );
  
// Middleware for user authentication
const authenticateUser = (req, res, next) => {

  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};



  module.exports = {authenticateUser}