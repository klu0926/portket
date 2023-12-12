const GoogleStrategy = require('passport-google-oauth2').Strategy
const { User, Visit } = require('../../models')
const bcryptjs = require('bcryptjs')

let CALLBACK_URL = ''
if (process.env.NODE_ENV !== 'production') {
  CALLBACK_URL = process.env.GOOGLE_CALLBACK
} else {
  CALLBACK_URL = process.env.GOOGLE_CALLBACK_DEV
}

console.log('Using callback URL:', CALLBACK_URL)

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: CALLBACK_URL,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const { email, name, picture } = profile._json
          // find user
          const user = await User.findOne({ where: { email } })
          if (user) return done(null, user)

          // create user, if not exist
          const randomPassword = Math.random().toString(36).slice(-8)
          // create visit record
          const newVisit = await Visit.create()
          // newUser
          const newUser = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(randomPassword),
            avatar: picture,
            visitId: newVisit.id,
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
