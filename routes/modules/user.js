const router = require('express').Router()
const userController = require('../../controls/user-controller')
const passport = require('passport')
const { multiUpload } = require('../../middleware/multer')

// Login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', userController.login)

// Register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

// Google login
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
)

// Google callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// Facebook login
router.get(
  '/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
  })
)

// Facebook callback
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    try {
      req.flash('success_msg', 'You have successfully logged out!')
      res.redirect('/users/login')
    } catch (err) {
      console.log('Logout Error')
      res.end()
    }
  })
})

// Get ALL user
router.get('/', userController.getUsers)
// Get ONE user
router.get('/:userId', userController.getUser)

// Edit Portfolio
router.put('/:userId', multiUpload, userController.putUser)

module.exports = router
