const passport = require('passport')
const { User } = require('../models/')
const LocalStrategy = require('./strategy/local')
const GoogleStrategy = require('./strategy/google')
const FacebookStrategy = require('./strategy/facebook')

module.exports = (app) => {
  // init passport
  app.use(passport.initialize())
  app.use(passport.session())

  // strategies
  LocalStrategy(passport)
  GoogleStrategy(passport)
  FacebookStrategy(passport)

  // serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

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
