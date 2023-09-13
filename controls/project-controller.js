const { User, Project, Social, Skill } = require('../models')
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
            attributes: ['id', 'name'],
            as: 'user',
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
}

module.exports = projectController
