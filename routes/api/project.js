const router = require('express').Router()
const projectControllerAPI = require('../../controls/api/project-controller-api')

router.delete('/:projectId', projectControllerAPI.deleteProject)
module.exports = router
