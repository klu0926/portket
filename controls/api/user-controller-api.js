const { User, Project, Social, Skill, Project_Link, Project_Skill, Project_Content, Visit } = require('../../models')
const { Op } = require('sequelize')
const responseObject = require('../../helper/responseObject')

const userController = {
  getUsers: async (req, res, next) => {
    const ACTION = 'GET Users'
    try {
      const column = req.query.column ? req.query.column : 'user'
      const keyword = req.query.keyword ? req.query.keyword : ''
      const sort = req.query.sort ? req.query.sort : 'time'
      const sortDirection = req.query.ascending ? 'ASC' : 'DESC'
      const limit = isFinite(req.query.limit) ? Number(req.query.limit) : 12

      const searchOption = {
        table: 'Users',
        column,
        keyword,
        sort,
        sortDirection,
        limit,
      }

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
      // (front end) send to front for select option
      const columnOptions = ['user', 'title', 'skill']

      // sort option
      // sort : time, visit, name
      // sort-direction: query 'ascending' check 'on', or null
      const sortOrder = []
      if (sort === 'time') {
        sortOrder.push('id', sortDirection)
      } else if (sort === 'visit') {
        sortOrder.push('visits', 'count', sortDirection)
      } else if (sort === 'project') {
        const sortLiteral = literal('(SELECT COUNT(*) FROM projects)')
        sortOrder.push(sortLiteral, sortDirection)
      } else if (sort === 'name') {
        sortOrder.push('name', sortDirection)
      }

      const totalUsers = await User.count()
      const usersData = await User.findAndCountAll({
        where: usersWhere,
        limit: limit,
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Project,
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
            required: Object.keys(skillWhere).length !== 0,
            // using 'where' will cause table be come a Inner Join
            // user with no skill will not be included
            // Include users even if they don't have skills
            // if skillWhere has key, require = true else false
          },
        ],
        order: [sortOrder],
        distinct: true, // return only unique rows
      })
      const users = usersData.rows.map((user) => user.toJSON())

      if (!users) {
        throw new Error('Can not get users')
      }
      const data = {
        searchOption: searchOption,
        users: users,
        totalCount: totalUsers,
        currentCount: users.length,
      }
      const message = `Successfully get users`
      res.json(responseObject(true, data, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, `${err.name}: ${err.message}`, ACTION))
    }
  },
}

module.exports = userController
