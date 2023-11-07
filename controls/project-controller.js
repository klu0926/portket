const { User, Project, Social, Skill, Project_Link, Project_Skill, Project_Content } = require('../models')
const { Op } = require('sequelize')
const randomPublicImage = require('../helper/randomPublicImage')
const imgurImageHandler = require('../helper/imgur')
const addHttp = require('../helper/addHttp')
const cleanTempFolder = require('../helper/cleanTempFolder')

const projectController = {
  getProject: async (req, res, next) => {
    try {
      const currentUser = req.user
      const projectId = req.params.projectId
      if (!projectId) throw new Error('No projectId')

      const allSkills = await Skill.findAll({
        attributes: ['id', 'name', 'description', 'icon'],
        raw: true,
      })
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
          {
            model: Project_Content,
            attributes: ['id', 'order', 'type', 'content', 'uuid'],
            as: 'contents',
          },
        ],
        order: [[{ model: Project_Content, as: 'contents' }, 'order', 'ASC']],
      })
      if (!projectData) throw new Error(`Can not find project with id ${projectId}`)
      const project = projectData.toJSON()

      // project skills
      project.skillsList = []
      if (project.skills) {
        project.skills.forEach((skill) => {
          project.skillsList.push(skill.id.toString())
        })
      }

      console.log(project)
      // clean imgur temp folder
      await cleanTempFolder()

      // check if current project own my current user
      if (currentUser?.id === project.userId) {
        res.render('myProject', { project, page: 'myProject', allSkills })
      } else {
        res.render('project', { project })
      }
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

      if (!title || !date || !description || !files) {
        const array = []
        if (!title) array.push('title')
        if (!date) array.push('date')
        if (!description) array.push('description')
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
  putProject: async (req, res, next) => {
    try {
      const currentUser = req.user
      const currentProject = await Project.findOne({
        where: {
          id: req.params.projectId,
        },
      })
      if (!currentProject) throw new Error('Can not find current project')
      if (!currentUser) throw new Error('Can not find current user')
      if (currentUser.id !== currentProject.userId) {
        req.flash('warning_msg', 'Current user can not edit this project.')
        return res.redirect('/users/login')
      }

      const body = req.body
      const files = req.files
      let newCover = ''

      // files : cover
      if (files?.cover && files.cover !== currentProject.cover) {
        newCover = await imgurImageHandler(files.cover[0])
      }

      // update project_links
      if (body.linkName) {
        if (typeof body.linkName === 'string') {
          body.linkName = [body.linkName]
        }
      }
      if (body.linkUrl) {
        if (typeof body.linkUrl === 'string') {
          body.linkUrl = [body.linkUrl]
        }
      }
      await Project_Link.destroy({ where: { projectId: currentProject.id } })
      if (body.linkName && body.linkUrl) {
        for (let i = 0; i < body.linkName.length; i++) {
          await Project_Link.create({
            projectId: currentProject.id,
            name: body.linkName[i],
            link: body.linkUrl[i],
          })
        }
      }

      // update project_skill
      if (body.skills) {
        if (typeof body.skills === 'string') {
          body.skills = [body.skills]
        }
      }
      await Project_Skill.destroy({ where: { projectId: currentProject.id } })
      if (body.skills) {
        for (let i = 0; i < body.skills.length; i++) {
          await Project_Skill.create({
            projectId: currentProject.id,
            skillId: Number(body.skills[i]),
          })
        }
      }

      // text content
      let contentText = []
      if (body.content && typeof body.content === 'string') {
        body.content = [body.content]
      }
      contentText = [...body.content]
      // use order
      if (body.order && typeof body.order === 'string') {
        body.order = [body.order]
      }

      // use uuid
      if (body.uuid && typeof body.uuid === 'string') {
        body.uuid = [body.uuid]
      }

      // arrange content order
      const order = body.order
      const contents = []
      for (let i = 0; i < order.length; i++) {
        const data = {
          order: i,
          uuid: body.uuid[i],
        }
        if (order[i] === 'text') {
          data.type = 'text'
          data.content = contentText.shift()
        } else if (order[i] === 'image') {
          data.type = 'image'
          data.content = ''
        }
        contents.push(data)
      }

      // Get Project_Content
      const originalContentData = await Project_Content.findAll({
        where: { projectId: currentProject.id },
        attributes: ['id', 'type', 'content', 'uuid'],
        raw: true,
      })

      // process contents
      for (let i = 0; i < contents.length; i++) {
        const original = originalContentData.find((obj) => obj.uuid === contents[i].uuid)
        // update content
        if (original) {
          const model = await Project_Content.findOne({ where: { id: original.id } })
          if (model && contents[i].type === 'text') {
            await model.update({
              content: contents[i].content,
              order: contents[i].order,
            })
          }
          if (model && contents[i].type === 'image') {
            await model.update({
              order: contents[i].order,
            })
          }
        } else {
          // create content
          if (contents[i].type === 'image') {
            if (files.content && files.content.length > 0) {
              contents[i].content = await imgurImageHandler(files.content.shift())
            }
          }
          await Project_Content.create({
            projectId: currentProject.id,
            type: contents[i].type,
            content: contents[i].content,
            order: contents[i].order,
            uuid: contents[i].uuid,
          })
        }
      }
      // delete Project_content
      const contentDateToDelete = originalContentData.filter((obj) => {
        return !contents.some((contentsObj) => contentsObj.uuid === obj.uuid)
      })
      const deletePromises = contentDateToDelete.map(async (c) => {
        await Project_Content.destroy({ where: { id: c.id } })
      })
      await Promise.all(deletePromises)

      // update project
      await currentProject.update({
        date: body.date || currentProject.date,
        title: body.title || currentProject.title,
        description: body.description || currentProject.description,
        cover: newCover || currentProject.cover,
      })

      res.redirect(`/projects/${currentProject.id}`)
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
