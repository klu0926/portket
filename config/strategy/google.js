const GoogleStrategy = require('passport-google-oauth2').Strategy
const { User, Visit } = require('../../models')
const bcryptjs = require('bcryptjs')
const imgurCustom = require('../../helper/imgurCustom')
const charAvatar = require('../../helper/charAvatar.js')

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
          // create visit record
          const newVisit = await Visit.create()

          // create avatar
          // picture provide from google is too small, let user upload picture instead
          const charAvatars = charAvatar(name)

          // newUser
          const newUser = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(randomPassword),
            avatar: charAvatars[0],
            avatarSmall: charAvatars[1],
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
