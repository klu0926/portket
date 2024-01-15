const router = require('express').Router()
const userController = require('../../controls/user-controller')
const passport = require('passport')
const { multiUpload } = require('../../middleware/multer')

// Login
router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)
// Register
router.get('/register', userController.getRegister)
router.post('/register', userController.postRegister)

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
router.get('/delete', userController.showDeletePage)
router.get('/logout', userController.getLogout)
router.get('/', userController.getUsers)
router.get('/:userId', userController.getUser)
// Edit Portfolio
router.put('/:userId', multiUpload, userController.putUser)
router.delete('/:userId', userController.deleteUser)
module.exports = router
