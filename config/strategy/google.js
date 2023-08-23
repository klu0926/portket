const GoogleStrategy = require('passport-google-oauth2').Strategy
const { User } = require('../../models')
const bcryptjs = require('bcryptjs')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const { email, name, picture } = profile._json
          // find user
          const user = await User.findOne({ where: { email } })
          if (user) return done(null, user)
          
          // create user, if not exist
          const randomPassword = Math.random().toString(36).slice(-8)
          const newUser = await User.create({
            name,
            email,
            avatar: picture,
            password: bcryptjs.hashSync(randomPassword),
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          // return user
          return done(null, newUser)
        } catch (err) {
          done(err, null)
        }
      }
    )
  )
}
