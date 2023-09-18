'use strict'
const { Project } = require('../models')
const errorHandler = require('../helper/errorHandler')

const LINK_COUNT = 2
const DUMMY_LINK = '/html/dummy-page.html'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const projects = await Project.findAll({ raw: true })
      if (!projects) throw new Error('Can not find projects!')

      const projectLinks = []

      projects.forEach((project) => {
        let count = 0
        while (count !== LINK_COUNT) {
          projectLinks.push({
            projectId: project.id,
            name: 'website',
            link: DUMMY_LINK,
          })
          count++
        }
      })
      return queryInterface.bulkInsert('Project_Links', projectLinks)
    } catch (err) {
      errorHandler(err, 'Project-link seeder')
    }
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Project_Links', null, {})
  },
}
