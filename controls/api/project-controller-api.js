const { User, Project, Social, Skill, Project_Link, Project_Skill, Project_Content, Visit } = require('../../models')
const { Op } = require('sequelize')
const responseObject = require('../../helper/responseObject')

const projectController = {
  deleteProject: async (req, res, next) => {
    const ACTION = 'DELETE project'
    try {
      const currentUser = req.user
      const projectId = req.params.projectId
      if (!currentUser) {
        throw new Error('You are not login.')
      }
      // find project
      const project = await Project.findOne({
        where: {
          id: projectId,
          userId: currentUser.id,
        },
      })
      if (!project) {
        throw new Error(`User ${currentUser.id} do not own project ${projectId}!`)
      }
      // delete
      await project.destroy()
      const message = `Successfully deleted project ${projectId}`
      res.json(responseObject(true, null, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, err.message, ACTION))
    }
  },
  getProjects: async (req, res, next) => {
    const ACTION = 'GET Projects'
    try {
      const DEFAULT_LIMIT = 12
      const column = req.query.column ? req.query.column : 'project'
      const keyword = req.query.keyword ? req.query.keyword : ''
      const sort = req.query.sort ? req.query.sort : 'time'
      const sortDirection = req.query.ascending ? 'ASC' : 'DESC'
      const limit = isFinite(req.query.limit) ? Number(req.query.limit) : DEFAULT_LIMIT
      const userId = req.query.userId || ''

      const searchOption = {
        table: 'Projects',
        column,
        keyword,
        sort,
        sortDirection,
        limit,
      }

      console.log('get projects api:', searchOption)

      // search option
      // project title, project description, user name, skill name
      // SQL query condition
      // projects / user / skill
      const KeywordObject = { [Op.like]: `%${keyword}%` }
      const projectsWhere = {}
      const userWhere = {}
      const skillWhere = {}
      if (column === 'project') {
        projectsWhere['title'] = KeywordObject
        projectsWhere['userId'] = userId
      } else if (column === 'user') {
        userWhere['name'] = KeywordObject
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
      } else if (sort === 'title') {
        sortOrder.push('title', sortDirection)
      }
      // (front end )send to front for select option
      const sortOptions = ['time', 'visit', 'title']

      // search
      const totalProjects = await Project.count()
      const projectsData = await Project.findAndCountAll({
        where: projectsWhere,
        limit: limit,
        attributes: {},
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar', 'avatarSmall'],
            as: 'user',
            where: userWhere,
          },
          {
            model: Project_Link,
            attributes: ['id', 'name', 'link'],
            as: 'links',
          },
          {
            model: Skill,
            attributes: ['id', 'name', 'icon'],
            as: 'skills',
            through: {
              attributes: [],
            },
            where: skillWhere,
            required: Object.keys(skillWhere).length !== 0,
            // using 'where' will cause table be come a Inner Join
            // user with no skill will not be included
            // required true : Include users even if they don't have skills
            // if skillWhere has key, require = true else false
          },
          {
            model: Visit,
            attributes: ['count'],
            as: 'visits',
          },
          {
            model: Project_Content,
            attributes: ['id', 'order', 'type', 'content', 'uuid'],
            as: 'contents',
          },
        ],
        order: [sortOrder],
        distinct: true, // return only unique rows
      })
      const projects = projectsData.rows.map((project) => project.toJSON())
      if (!projects) {
        throw new Error('Can not get projects.')
      }

      const data = {
        searchOption: searchOption,
        projects: projects,
        totalCount: totalProjects,
        currentCount: projects.length,
      }

      console.log('api get projects data:', data)

      const message = `Successfully get projects`
      res.json(responseObject(true, data, message, ACTION))
    } catch (err) {
      res.json(responseObject(false, null, `${err.name}: ${err.message}`, ACTION))
    }
  },
}

module.exports = projectController
