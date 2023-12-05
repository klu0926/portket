const router = require('express').Router()
const resourceController = require('../../controls/api/resource-controller-api')
router.get('/landing', resourceController.landing)
module.exports = router
