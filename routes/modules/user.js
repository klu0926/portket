const router = require("express").Router()

// 登入
router.get('/login', (req, res)=> {
  res.render('login')
})
router.post('/login', (req, res)=>{
  res.send('login')
})

// 建立帳號
router.get('/signup', (req, res)=>{
  res.render('signup')
})
router.post('/signup', (req, res)=>{
  res.send('signup')
})

// 登出
router.post('logout', (req, res)=> {
  res.send('logout')
})

module.exports = router