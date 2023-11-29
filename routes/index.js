const router = require('express').Router()
const user = require('./modules/user')
const project = require('./modules/project')
const resource = require('./modules/resource')
const visit = require('./modules/visit')
const { authenticator } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')

router.use('/visits',authenticator,  visit)
router.use('/resource', resource)
router.use('/users', user)
router.use('/projects', project)
router.get('/', (req, res) => {
  res.redirect('/users')
})
router.use(errorHandler)

module.exports = router
