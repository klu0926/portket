const { User, Project, Social, Skill, User_Social, User_Skill, Visit } = require('../models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')
const sequelize = require('sequelize')
const imgur = require('../helper/imgur')
const imgurCustom = require('../helper/imgurCustom')
const allLocations = require('../data/location.json')
const cleanTempFolder = require('../helper/cleanTempFolder')
const getOffset = require('../helper/getPaginationOffset')

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
      const cover = randomPublicImage('covers')
      const smallCover = '/images/covers_small/' + cover.split('/')[3]

      // create visit record
      const newVisit = await Visit.create()
      // create account
      const newUser = await User.create({
        name,
        email,
        password: bcryptjs.hashSync(password),
        cover: cover,
        smallCover: smallCover,
        visitId: newVisit.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      // clean imgur temp folder
      await cleanTempFolder()

      res.redirect('/') // home page
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const column = req.query.column ? req.query.column : 'user'
      const keyword = req.query.keyword ? req.query.keyword : ''
      const sort = req.query.sort ? req.query.sort : 'time'
      const sortDirection = req.query.ascending ? 'ASC' : 'DESC'
      const page = isFinite(req.query.page) ? Number(req.query.page) : 1
      const limit = isFinite(req.query.limit) ? Number(req.query.limit) : 12
      const offset = getOffset(page, limit)

      // search option
      const KeywordObject = { [Op.like]: `%${keyword}%` }
      const usersWhere = {}
      const skillWhere = {}
      if (column === 'user') {
        usersWhere['name'] = KeywordObject
      } else if (column === 'title') {
        usersWhere['title'] = KeywordObject
      } else if (column === 'skill') {
        skillWhere['name'] = KeywordObject
      }

      // sort option
      // sort : time, visit, name
      // sort-direction: query 'ascending' check 'on', or null
      const sortOrder = []
      if (sort === 'time') {
        sortOrder.push('id', sortDirection)
      } else if (sort === 'visit') {
        sortOrder.push('visits', 'count', sortDirection)
      } else if (sort === 'name') {
        sortOrder.push('name', sortDirection)
      }

      const totalUsers = await User.count()
      const usersData = await User.findAndCountAll({
        where: usersWhere,
        limit: limit,
        offset: offset,
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Project,
            attributes: ['id'],
            as: 'projects',
          },
          {
            model: Visit,
            attributes: ['count'],
            as: 'visits',
          },
          {
            model: Skill,
            attributes: ['id', 'name', 'description', 'icon'],
            as: 'skills',
            through: {
              attributes: [],
            },
            where: skillWhere,
          },
        ],
        order: [sortOrder],
        distinct: true, // return only unique rows
      })
      const users = usersData.rows.map((user) => user.toJSON())

      // current user to the top
      const currentUser = req.user
      if (currentUser) {
        const userIndex = users.findIndex((user) => user.id === currentUser.id)
        if (userIndex !== -1) {
          users.unshift(users.splice(userIndex, 1)[0])
        }
      }

      // get random landing image
      const landingImage = randomPublicImage('landing')
      res.render('users', {
        users,
        totalCount: totalUsers,
        currentCount: usersData.count,
        page,
        limit,
        offset,
        keyword,
        column,
        sort,
        sortDirection,
        landingImage,
        totalPages: Math.ceil(usersData.count / limit),
        currentPage: 'users',
      })
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
          exclude: ['password'],
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
              {
                model: Visit,
                attributes: ['count'],
                as: 'visits',
              },
            ],
          },
          {
            model: User_Social,
            attributes: ['id', 'link', 'socialId'],
            as: 'socials',
          },
          {
            model: Skill,
            attributes: ['id', 'name', 'description', 'icon'],
            as: 'skills',
            through: {
              attributes: [],
            },
          },
          {
            model: Visit,
            attributes: ['count'],
            as: 'visits',
          },
        ],
        order: [[{ model: Project, as: 'projects' }, 'id', 'DESC']],
      })
      const user = userData.toJSON()

      user.socials.forEach((social) => {
        social['icon'] = allSocials[social.socialId - 1].icon
      })

      user.skillsList = []
      user.skills.forEach((skill) => {
        user.skillsList.push(skill.id.toString())
      })

      console.log('user', user)

      // check if user is current user
      if (req.user?.id === user.id) {
        res.render('myPortfolio', {
          user,
          allSkills,
          allSocials,
          allLocations,
          page: 'myPortfolio',
        })
      } else {
        res.render('portfolio', { user })
      }
    } catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    try {
      console.log('PUT USER --------------------')
      const userId = req.params.userId
      if (userId === undefined) throw new Error('PUT user: userId is undefined')
      const currentUser = req.user
      if (userId !== currentUser.id.toString()) {
        req.flash('warning_msg', 'Something went wrong, please try logout and login again.')
        return res.redirect(`/users/${userId}`)
      }

      const body = req.body
      const files = req.files

      let newAvatars = []
      let newCovers = []
      const newName = body.name ? body.name.trim() : ''
      const newTitle = body.title ? body.title.trim() : ''
      const newDescription = body.description ? body.description.trim() : ''
      const newEmail = body.email ? body.email.trim() : ''
      const newPhone = body.phone ? body.phone.trim() : ''
      const newCity = body.city ? body.city.trim() : ''
      const newCountry = body.country ? body.country.trim() : ''
      const newThemeId = body.themeId ? body.themeId.trim() : ''
      let newSocials = []
      let newSocialsLinks = []
      let newSkills = []

      // files
      if (files?.cover && files.cover !== currentUser.cover) {
        newCovers = await imgurCustom(files.cover[0], 2028, 400)
      }
      if (files?.avatar && files.avatar !== currentUser.avatar) {
        newAvatars = await imgurCustom(files.avatar[0], 400, 100)
      }

      // user skills
      if (body.skills) {
        newSkills = typeof body.skills === 'string' ? [body.skills] : body.skills
      }

      // user social
      if (body.socials) {
        newSocials = typeof body.socials === 'string' ? [body.socials] : body.socials
      }
      if (body.socialsLinks) {
        newSocialsLinks = typeof body.socialsLinks === 'string' ? [body.socialsLinks] : body.socialsLinks
        // check for http:// and https://
        newSocialsLinks = newSocialsLinks.map((url) => {
          if (!url.startsWith('http://') && !url.startsWith('http')) {
            return 'http://' + url
          } else {
            return url
          }
        })
      }

      // User_Skill
      await User_Skill.destroy({
        where: { userId: currentUser.id },
      })
      for (let i = 0; i < newSkills.length; i++) {
        await User_Skill.create({
          userId: currentUser.id,
          skillId: Number(newSkills[i]),
        })
      }

      // User_Social
      await User_Social.destroy({
        where: { userId: currentUser.id },
      })
      for (let i = 0; i < newSocials.length; i++) {
        await User_Social.create({
          userId: currentUser.id,
          link: newSocialsLinks[i],
          socialId: Number(newSocials[i]),
        })
      }

      // get User
      const userModel = await User.findOne({ where: { id: userId } })
      if (!userModel) throw new Error(`Can not find user ${userId}`)
      const user = userModel.toJSON()

      // coverPosition
      let coverPosition = user.coverPosition
      if (isFinite(body.coverPosition)) {
        coverPosition = Number(body.coverPosition)
      }

      // update
      await userModel.update({
        name: newName || user.name,
        email: newEmail || user.email,
        avatar: newAvatars?.[0] || user.avatar,
        avatarSmall: newAvatars?.[1] || user.avatarSmall,
        cover: newCovers?.[0] || user.cover,
        coverSmall: newCovers?.[1] || user.coverSmall,
        coverPosition,
        title: newTitle || user.title,
        description: newDescription || user.description,
        country: newCountry || user.country,
        city: newCity || user.city,
        phone: newPhone || user.phone,
        themeId: Number(newThemeId) || Number(user.themeId),
      })

      //  clean imgur temp folder
      await cleanTempFolder()

      res.redirect(`/users/${userId}`)
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
