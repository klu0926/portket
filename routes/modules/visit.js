const router = require('express').Router()
const projectController = require('../../controls/visit-controller')
router.get('/:id', projectController.getVisit)
router.put('/:id', projectController.putVisit)
module.exports = router
