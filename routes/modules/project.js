const router = require('express').Router()
const projectController = require('../../controls/project-controller')
const { multiUpload } = require('../../middleware/multer')

router.get('/:projectId', projectController.getProject)
router.post('/', multiUpload, projectController.createProject)

module.exports = router
