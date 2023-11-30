const router = require('express').Router()
const user = require('./modules/user')
const project = require('./modules/project')
const resource = require('./modules/resource')
const visit = require('./modules/visit')
const { authenticator } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

router.use('/resource', resource)
router.use('/projects', project)
router.use('/visits', visit)
router.use('/users', user)
router.get('/', (req, res) => {
  res.redirect('/users')
})
router.use(errorHandler)

module.exports = router
