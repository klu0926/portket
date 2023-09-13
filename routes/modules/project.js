const router = require('express').Router()
const projectController = require('../../controls/project-controller')

router.get('/:projectId', projectController.getProject)

module.exports = router
