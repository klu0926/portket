const LocalStrategy = require('passport-local').Strategy
const { User } = require('../../models')
const bcryptjs = require('bcryptjs')

module.exports = (passport) => {
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

          // return user
          return done(null, user)
        } catch (err) {
          done(err, false)
        }
      }
    )
  )
}
