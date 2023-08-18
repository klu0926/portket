const { User } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')


const userController = {
  register: async (req, res, next) => {
    try {
      
      const {name, email, password, confirmPassword} = req.body
      
      //check for error
      const errors = []
      if (!name || !email, !password, !confirmPassword) {
        errors.push({message: 'All inputs required!'})
      }
      if (password !== confirmPassword){
        errors.push({message: 'Passwords do not match!'})
      }
      if (errors.length){
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      
      // no error, find it user exist
      const user = await User.findOne({
        where: { email },
      })

      if (user) {
        errors.push({message : 'This email is already registered!'})
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      // create account
      const newUser = await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password),
        createAt: new Date(),
        updatedAt: new Date()
      })
      res.redirect('/') // home page
    } catch (err) {
      console.log(err)
    }
  },
}

module.exports = userController
