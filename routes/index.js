const router = require('express').Router()
const user = require('./modules/user')

router.use('/users', user)
router.get('', (req, res)=> {
  res.render('index')
})

module.exports = router