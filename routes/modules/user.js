const router = require('express').Router()
const userController = require('../../controls/user-controller')
const passport = require('passport')

// Local 登入
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', userController.login)

// 建立帳號
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

// Google 登入
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

// Facebook 登入
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

// 登出
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

// 首頁＋展示全部使用者
router.get('/', userController.getUsers)
// 個人Portfolio
router.get('/:userId', userController.getUser)

module.exports = router
