const { User, Project, Social, Skill } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')
const sequelize = require('sequelize')

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
      // random Cover
      const randomCover = randomPublicImage('covers')

      // create account
      const newUser = await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password),
        cover: randomCover,
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
      // SQL 'like' search for matching substring, % means can be anything
      const whereCondition = keyword
        ? {
            [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }, { title: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }],
          }
        : {}

      const usersData = await User.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'name', 'title', 'avatar', 'cover', 'description'],
        include: [
          {
            model: Project,
            attributes: ['id'],
            as: 'projects',
          },
        ],
        order: [['id', 'DESC']],
      })
      usersData.rows = usersData.rows.map((user) => user.toJSON())

      // current user to the top
      const currentUser = req.user
      if (currentUser) {
        const userIndex = usersData.rows.findIndex((user) => user.id === currentUser.id)
        if (userIndex !== -1) {
          usersData.rows.unshift(usersData.rows.splice(userIndex, 1)[0])
        }
      }

      res.render('index', { users: usersData.rows, count: usersData.count, keyword })
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req.params.userId
      const allSkills = await Skill.findAll({
        attributes: ['id', 'name', 'description', 'icon'],
        raw: true,
      })
      const userData = await User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
        include: [
          {
            model: Project,
            as: 'projects',
            attributes: {
              exclude: ['updatedAt'],
            },
            include: [
              {
                model: Skill,
                attributes: ['id', 'name', 'description', 'icon'],
                as: 'skills',
                through: {
                  attributes: [],
                },
              },
            ],
          },
          {
            model: Social,
            attributes: ['id', 'name', 'icon'],
            as: 'socials',
            through: {
              as: 'projectSocial',
              attributes: ['link'],
            },
          },
          {
            model: Skill,
            attributes: ['id', 'name', 'description', 'icon'],
            as: 'skills',
            through: {
              attributes: [],
            },
          },
        ],
        order: [[{ model: Project, as: 'projects' }, 'id', 'DESC']],
      })
      const user = userData.toJSON()
      console.log(user)
      // social links
      if (user.socials) {
        user.socials.forEach((social) => {
          social.link = social.projectSocial.link
          delete social.projectSocial
        })
      }

      // check if user is current user
      if (req.user?.id === user.id) {
        console.log('my portfolio')
        res.render('myPortfolio', { user, allSkills })
      } else {
        console.log('portfolio')
        res.render('portfolio', { user })
      }
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
