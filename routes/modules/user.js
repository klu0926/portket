const router = require('express').Router()
const userController = require('../../controls/user-controller')

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', userController.login)

// 建立帳號
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', userController.register)

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

module.exports = router
