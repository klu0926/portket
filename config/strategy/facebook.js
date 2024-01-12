const FacebookStrategy = require('passport-facebook').Strategy
const { User, Visit } = require('../../models')
const bcryptjs = require('bcryptjs')
const charAvatar = require('../../helper/charAvatar.js')

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const { name, email } = profile._json
          // find user
          const user = await User.findOne({ where: { email } })
          if (user) return done(null, user)

          // Can't find user, create one
          const randomPassword = Math.random().toString(36).slice(-8)

          // create avatar
          // picture provide from google is too small, let user upload picture instead
          const charAvatars = charAvatar(name)

          // create visit record
          const newVisit = await Visit.create()
          const newUser = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(randomPassword),
            visitId: newVisit.id,
            avatar: charAvatars[0],
            avatarSmall: charAvatars[1],
            createdDate: new Date(),
            updatedDate: new Date(),
          })
          return done(null, newUser)
        } catch (err) {
          done(err, null)
        }
      }
    )
  )
}
