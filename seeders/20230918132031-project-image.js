'use strict'
const faker = require('../helper/faker')
const { Project } = require('../models')
const { errorHandler } = require('../helper')
const RandomPublicImage = require('../helper/randomPublicImage')

const IMAGE_COUNT = 3

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const projects = await Project.findAll({ raw: true })
      if (!projects) throw new Error('Can not find projects!')

      const projectImages = []

      projects.forEach((projects) => {
        let count = 0
        while (count !== IMAGE_COUNT) {
          projectImages.push({
            projectId: projects.id,
            name: faker.lorem.word(),
            description: faker.lorem.sentences(),
            image: RandomPublicImage('project_images'),
          })
          count++
        }
      })

      return queryInterface.bulkInsert('Project_Images', projectImages)
    } catch (err) {
      errorHandler(err)
    }
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Project_Images', null, {})
  },
}
