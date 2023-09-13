const { User, Project, Social, Skill } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')

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
      console.log('keyword', keyword)
      // SQL 'like' search for matching substring, % means can be anything
      const whereCondition = keyword
        ? {
            [Op.or]: [{ name: { [Op.like]: `%${keyword}%` } }, { email: { [Op.like]: `%${keyword}%` } }, { title: { [Op.like]: `%${keyword}%` } }, { description: { [Op.like]: `%${keyword}%` } }],
          }
        : {}
      const { count, rows } = await User.findAndCountAll({
        where: whereCondition,
        attributes: ['id', 'name', 'title', 'avatar', 'cover', 'description'],
        raw: true,
      })
      res.render('index', { userCount: count, users: rows, keyword })
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const userId = req.params.userId
      const userData = await User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Project,
            as: 'projects',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Social,
            attributes: ['id', 'name', 'icon'],
            as: 'socials', // defined in the association
          },
          {
            model: Skill,
            attributes: ['id', 'name', 'description', 'icon'],
            as: 'skills',
          },
        ],
        nest: true,
      })

      const user = userData.toJSON()
      // socials: try to get the User_Social's 'link' attributes from User.Socials
      if (user.socials) {
        user.socials = user.socials.map((social) => {
          return {
            id: social.id,
            name: social.name,
            icon: social.icon,
            link: social.User_Social.link,
          }
        })
      }
      // skills
      if (user.skills) {
        user.skills.forEach((skill) => {
          delete skill.User_Skill
        })
      }

      console.info(user)
      res.render('portfolio', { user })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
