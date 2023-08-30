const router = require('express').Router()
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')
const {errorHandler} = require('../middleware/error-handler')

router.use('/users', user)
router.get('/', authenticator, (req, res) => {
  res.redirect('/users')
})
router.use('/', errorHandler)
router.use(errorHandler)

module.exports = router
