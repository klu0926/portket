const router = require('express').Router()
const projectController = require('../../controls/project-controller')
const projectControllerAPI = require('../../controls/api/project-controller-api')
const { multiUpload } = require('../../middleware/multer')
// backend
router.get('/:projectId', projectController.getProject)
router.put('/:projectId', multiUpload, projectController.putProject)
router.post('/', multiUpload, projectController.createProject)

module.exports = router
