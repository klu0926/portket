const router = require('express').Router()
const projectController = require('../../controls/visit-controller')
router.put('/:visitId', projectController.increaseVisit)
module.exports = router
