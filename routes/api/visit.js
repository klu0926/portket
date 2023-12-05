const router = require('express').Router()
const projectController = require('../../controls/api/visit-controller-api')
router.get('/:id', projectController.getVisit)
router.put('/:id', projectController.putVisit)
module.exports = router
