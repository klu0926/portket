const router = require('express').Router()
const passport = require('passport')
const { authenticator } = require('../../middleware/auth')


// 登入
router.get('/login', (req, res) => {
  res.render('login')
})
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

// 建立帳號
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  res.send('register')
})

// 登出
router.get('/logout', (req, res) => {
  req.logout(() => {
    try {
      res.redirect('/users/login')
    } catch (err) {
      console.log('Logout Error')
      res.end()
    }
  })
})

module.exports = router
