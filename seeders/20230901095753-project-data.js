'use strict'
const { User } = require('../models')
const { faker } = require('@faker-js/faker')

const SEED_AMOUNT = 5
class RandomProjectGenerator {
  constructor() {}
  create(userId) {
    const newProject = {
      title: 'Simple Project Title',
      description: faker.lorem.paragraph(),
      cover: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      userId,
    }
    return newProject
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ raw: true })
    const projects = []
    const randomProject = new RandomProjectGenerator()

    users.forEach((user) => {
      for (let i = 0; i < SEED_AMOUNT; i++) {
        projects.push(randomProject.create(user.id))
      }
    })
    return queryInterface.bulkInsert('Projects', projects)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {})
  },
}
