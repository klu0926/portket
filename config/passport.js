const passport = require('passport')
const { User } = require('../models/')
const LocalStrategy = require('./strategy/local')
const GoogleStrategy = require('./strategy/google')
const FacebookStrategy = require('./strategy/facebook')

module.exports = (app) => {
  // init passport
  app.use(passport.initialize())
  // Allow passport to work with express-session
  // Passport does not deal with session itself, it use express-session to get user id from Session table, than use passport.deserializeUser to get user object from User table, than store user object to req.user
  app.use(passport.session())

  // strategies
  LocalStrategy(passport)
  GoogleStrategy(passport)
  FacebookStrategy(passport)

  // serialize and deserialize
  // store user id to session (cookie)
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Get user object from database, and store in req.user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        raw: true,
      })
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
}
