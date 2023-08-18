const router = require('express').Router()
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/users', user)
router.get('/', authenticator, (req, res) => {
  res.render('index')
})

module.exports = router
