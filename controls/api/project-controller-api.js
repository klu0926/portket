const { Project } = require('../../models')
const responseObject = require('../../helper/responseObject')

const projectController = {
  deleteProject: async (req, res, next) => {
    const ACTION = 'DELETE project'
    try {
      const currentUser = req.user
      const projectId = req.params.projectId
      console.log('projectId delete', projectId)
      if (!currentUser) {
        res.redirect('/users/login')
        return
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
}

module.exports = projectController
