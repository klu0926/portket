const { User, Project, Social, Skill, Project_Image, Project_Link } = require('../models')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')

const projectController = {
  getProject: async (req, res, next) => {
    try {
      const projectId = req.params.projectId
      if (!projectId) new Error('No projectId')

      const projectData = await Project.findOne({
        where: { id: projectId },
        attributes: {
          exclude: ['createdAt', 'updateAt'],
        },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'avatar'],
            as: 'user',
          },
          {
            model: Project_Image,
            attributes: ['id', 'name', 'image', 'description'],
            as: 'images',
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
          },
        ],
      })
      if (!projectData) new Error(`Can not find project with id ${projectId}`)
      const project = projectData.toJSON()
      console.log(project)
      res.render('project', { project })
    } catch (err) {
      next(err)
    }
  },
  createProject: async (req, res, next) => {
    try {
      const currentUser = req.user
      if (!currentUser) throw new Error('Can not get current user')
      console.log(req)
      res.json({
        message: 'this is working',
        body: req.body,
        file: req.files,
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = projectController
