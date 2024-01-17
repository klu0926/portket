const router = require('express').Router()
// api
const resourceAPI = require('./api/resource')
const visitAPI = require('./api/visit')
const projectAPI = require('./api/project')
const userAPI = require('./api/user')
// modules
const user = require('./modules/user')
const project = require('./modules/project')
// helper
const { authenticator } = require('../middleware/auth')
const { errorHandler } = require('../middleware/error-handler')
// --------------------------------------
// api
router.use('/api/visits', visitAPI)
router.use('/api/resource', resourceAPI)
router.use('/api/projects', projectAPI)
router.use('/api/users', userAPI)
// modules
router.use('/projects', project)
router.use('/users', user)
router.get('/', (req, res) => {
  res.redirect('/users')
})
router.use(errorHandler)

module.exports = router
