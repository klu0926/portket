const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/')
const bcryptjs = require('bcryptjs')

module.exports = (app) => {
  // init passport
  app.use(passport.initialize())
  app.use(passport.session())

  // local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({
            where: { email },
            raw: true,
          })
          // check if user exist
          if (!user) return done(null, false, req.flash('warning_msg', 'That email is not registered!'))

          // compare password
          const match = await bcryptjs.compare(password, user.password)
          if (!match) return done(null, false, req.flash('warning_msg', 'Email or password incorrect!'))

          // is authenticated, return user
          return done(null, user, {message: 'Successfully logged in'})
        } catch (err) {
          done(err, false)
        }
      }
    )
  )

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
