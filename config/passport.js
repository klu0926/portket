const passport = require('passport')
const { User } = require('../models/')
const LocalStrategy = require('./strategy/local')
const GoogleStrategy = require('./strategy/google')

module.exports = (app) => {
  // init passport
  app.use(passport.initialize())
  app.use(passport.session())

  // strategies
  LocalStrategy(passport)
  GoogleStrategy(passport)

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
