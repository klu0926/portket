const router = require('express').Router()
const user = require('./modules/user')
const project = require('./modules/project')
const { authenticator } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

router.use('/users', user)
router.use('/projects', project)

// index
router.get('/', (req, res) => {
  res.redirect('/users')
})
router.use(errorHandler)

module.exports = router
