const { User, Project, Social, Skill, Project_Image, Project_Link, Project_Skill } = require('../models')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')
const imgurImageHandler = require('../helper/imgur')
const addHttp = require('../helper/addHttp')

const projectController = {
  getProject: async (req, res, next) => {
    try {
      const projectId = req.params.projectId
      if (!projectId) throw new Error('No projectId')

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
      if (!projectData) throw new Error(`Can not find project with id ${projectId}`)
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
      if (!currentUser) {
        res.redirect('/users/login')
        return
      }

      const { title, date, description, skills, linkName, linkUrl } = req.body
      const { files } = req

      if (!title || !date || !description || !linkName || !linkUrl || !files) {
        const array = []
        if (!title) array.push('title')
        if (!date) array.push('date')
        if (!description) array.push('description')
        if (!linkName) array.push('linkName')
        if (!linkUrl) array.push('linkUrl')
        if (!files) array.push('files')
        let errMessage = 'Create Project: Missing: ' + array.join(',')
        throw new Error(errMessage)
      }

      // upload file to imgur
      if (!files && !files.cover[0]) throw new Error('Missing project cover image')
      const imgurUrl = await imgurImageHandler(files.cover[0])

      // Create project
      const project = await Project.create({
        userId: currentUser.id,
        title,
        date,
        description,
        cover: imgurUrl,
      })

      // create project link
      const projectLinks = []
      // deal with single input or multiple input
      if (typeof linkName === 'string') {
        projectLinks.push({
          projectId: project.id,
          name: linkName,
          link: addHttp(linkUrl),
        })
      } else if (typeof linkName === 'object') {
        for (let i = 0; i < linkName.length; i++) {
          projectLinks[i] = {
            projectId: project.id,
            name: linkName[i],
            link: addHttp(linkUrl[i]),
          }
        }
      }
      if (projectLinks.length > 0) await Project_Link.bulkCreate(projectLinks)

      // create project skill
      const projectSkills = []
      // deal with single input or multiple input
      if (typeof skills === 'string') {
        projectSkills.push({
          projectId: project.id,
          skillId: skills,
        })
      } else if (typeof skills === 'object') {
        skills.forEach((skillId) =>
          projectSkills.push({
            projectId: project.id,
            skillId: skillId,
          })
        )
      }
      if (projectSkills.length > 0) await Project_Skill.bulkCreate(projectSkills)

      res.redirect(`/users/${currentUser.id}`)
    } catch (err) {
      next(err)
    }
  },
  deleteProject: async (req, res, next) => {
    try {
      const currentUser = req.user
      const projectId = req.params.projectId

      if (!currentUser) {
        res.redirect('/users/login')
        return
      }

      const project = await Project.findOne({
        where: { id: projectId },
      })
      if (!project) {
        req.flash('warning_msg', `Can not find project ${projectId}`)
      }
      // delete
      await project.destroy()
      res.redirect(`/users/${currentUser.id}`)
    } catch (err) {
      next(err)
    }
  },
}

module.exports = projectController
