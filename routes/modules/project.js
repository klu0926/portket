const router = require('express').Router()
const projectController = require('../../controls/project-controller')
const { multiUpload } = require('../../middleware/multer')

router.get('/:projectId', projectController.getProject)
router.put('/:projectId', multiUpload, projectController.putProject)
router.post('/', multiUpload, projectController.createProject)
router.delete('/:projectId', projectController.deleteProject)

module.exports = router
