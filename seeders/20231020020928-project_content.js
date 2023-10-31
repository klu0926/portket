'use strict'
const faker = require('../helper/faker')
const { Project } = require('../models')
const { errorHandler } = require('../helper')
const RandomPublicImage = require('../helper/randomPublicImage')
const randomId = require('../helper/randomId')

const CONTENT_COUNT = 6

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const projects = await Project.findAll({ raw: true })
      if (!projects && projects.length === 0) throw new Error('Can not find projects')

      const projectContents = []
      // 3 image, 3 text
      // order as 1 image then 1 text etc
      for (let i = 0; i < projects.length; i++) {
        for (let c = 1; c <= CONTENT_COUNT; c++) {
          let type = ''
          let content = ''
          let uuid = randomId(10)
          if (c % 2 === 1) {
            type = 'image'
            content = RandomPublicImage('project_images')
          } else {
            type = 'text'
            content = faker.lorem.paragraphs(5)
          }
          projectContents.push({
            projectId: projects[i].id,
            order: c,
            type,
            content,
            uuid,
          })
        }
      }

      return queryInterface.bulkInsert('Project_Contents', projectContents)
    } catch (err) {
      errorHandler(err)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Project_Contents', null, {})
  },
}
