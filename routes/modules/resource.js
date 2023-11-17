const router = require('express').Router()
const resourceController = require('../../controls/resource-controller')

router.get('/landing', resourceController.landing)
module.exports = router
