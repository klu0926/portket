const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/')

module.exports = (app) => {
  // init passport
  app.use(passport.initialize())
  app.use(passport.session())

  // local strategy
  passport.use(new LocalStrategy({ usernameField: 'email' }), async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: { email },
        raw: true,
      })
      if (!user) return done(null, false, { message: 'That email is not registered!' })
      if (user.password !== password) return done(null, false, { message: 'Email or Password incorrect!' })
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  })

  // serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { email },
        raw: true,
      })
      done(null, user)
    } catch (err) {
      done(err, false)
    }
  })
}
