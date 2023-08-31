const { User } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')

const userController = {
  login: (req, res, next) => {
    try {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.redirect('/users/login')
        }
        // login
        req.login(user, (loginErr) => {
          if (loginErr) return next(loginErr)
          req.flash('success_msg', 'Logged in.')
          return res.redirect('/')
        })
      })(req, res, next)
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      //check for error
      const errors = []
      if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: 'All inputs required!' })
      }
      if (password !== confirmPassword) {
        errors.push({ message: 'Passwords do not match!' })
      }
      if (errors.length) {
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }

      // no error, find it user exist
      const user = await User.findOne({
        where: { email },
      })

      if (user) {
        errors.push({ message: 'This email is already registered!' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      // create account
      const newUser = await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      res.redirect('/') // home page
    } catch (err) {
      console.log(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      let keyword = req.query.keyword ? req.query.keyword : ''
      console.log('keyword', keyword)
      // SQL 'like' search for matching substring, % means can be anything
      const whereCondition = keyword
        ? {
            [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }, { title: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }],
          }
        : {}
      const { count, rows } = await User.findAndCountAll({
        where: whereCondition,
        raw: true,
      })
      res.render('index', { userCount: count, users: rows, keyword })
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req.param.userId
      console.log('userId')
      const user = await User.findOne({
        where: { id },
        raw: true,
      })
      res.render('portfolio', { user })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
