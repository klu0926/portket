const { User, Project, Social, Skill } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')
const sequelize = require('sequelize')
const imgurFileHandler = require('../helper/imgur')

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
      next(err)
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
      const allSocials = await Social.findAll({
        attributes: ['id', 'name', 'icon'],
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
      if (user.socials) {
        user.socials.forEach((social) => {
          social.link = social.User_Social.link
          delete social.User_Social
        })
      }

      console.log(user)
      // check if user is current user
      if (req.user?.id === user.id) {
        res.render('myPortfolio', { user, allSkills, allSocials, page: 'myPortfolio' })
      } else {
        res.render('portfolio', { user })
      }
    } catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    try {
      console.log('putUser')
      const userId = req.params.userId
      const currentUserId = req.user.id.toString()
      if (userId !== currentUserId) {
        req.flash('warning_msg', 'Something went wrong, please try logout and login again.')
        return res.redirect(`/users/${userId}`)
      }

      const body = req.body
      const files = req.files

      const newName = body.name ? body.name.trim() : ''
      const newTitle = body.title ? body.title.trim() : ''
      const newEmail = body.email ? body.email.trim() : ''
      const newPhone = body.phone ? body.phone.trim() : ''
      const newDescription = body.description ? body.description.trim() : ''
      const newCity = body.city ? body.city.trim() : ''
      const newCountry = body.country ? body.country.trim() : ''
      const newThemeId = body.themeId ? body.themeId.trim() : ''

      let newSocials = []
      let newSocialsLinks = []
      if (body.socials && typeof body.socials === 'string') {
        newSocials = [body.socials]
      }
      if (body.socialsLinks && typeof body.socialsLinks === 'string') {
        newSocialsLinks = [body.socialsLinks]
      }
      console.log(newSocials, newSocialsLinks)

      let newAvatar = ''
      let newCover = ''

      console.log('body', body)

      // get User
      const userModel = await User.findOne({ where: { id: userId } })
      if (!userModel) throw new Error(`Can not find user ${userId}`)
      const user = userModel.toJSON()

      // body

      // files
      if (files?.avatar) {
        newAvatar = await imgurFileHandler(files.avatar[0])
      }
      if (files?.cover) {
        newCover = await imgurFileHandler(files.cover[0])
      }

      // update
      await userModel.update({
        name: newName || user.name,
        email: newEmail || user.email,
        avatar: newAvatar || user.avatar,
        cover: newCover || user.cover,
        title: newTitle || user.title,
        description: newDescription || user.description,
        country: newCountry || user.country,
        city: newCity || user.city,
        phone: newPhone || user.phone,
        themeId: Number(newThemeId) || Number(user.themeId),
        // password
      })

      res.redirect(`/users/${userId}`)
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
