const router = require("express").Router()

// 登入
router.get('/login', (req, res)=> {
  res.render('login')
})
router.post('/login', (req, res)=>{
  res.send('login')
})

// 建立帳號
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  res.send("register");
});

// 登出
router.post('logout', (req, res)=> {
  res.send('logout')
})

module.exports = router