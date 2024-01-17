const router = require('express').Router()
const userControllerAPI = require('../../controls/api/user-controller-api')

router.get('/', userControllerAPI.getUsers)
module.exports = router
