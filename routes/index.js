const router = require('express').Router()
const user = require('./modules/user')



// router.post('/login' )
// router.post('/signup' )
// router.post('/logout')


router.use('/users', user)
router.get('', (req, res)=> {
  res.send('Hello world!')
})

module.exports = router