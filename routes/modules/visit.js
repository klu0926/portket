const router = require('express').Router()
const projectController = require('../../controls/visit-controller')
const { authenticator } = require('../../middleware/auth')
router.get('/:id', projectController.getVisit)
router.put('/:id', projectController.putVisit)
module.exports = router
