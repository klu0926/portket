const router = require('express').Router()
const projectControllerAPI = require('../../controls/api/project-controller-api')
// backend
router.delete('/:projectId', projectControllerAPI.deleteProject)
module.exports = router
