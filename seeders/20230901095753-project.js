'use strict'
const { User, Visit } = require('../models')
const { faker } = require('@faker-js/faker')
const randomPublicImage = require('../helper/randomPublicImage')

const SEED_AMOUNT = 5
const SEED_VISIT_MAX = 1001

class RandomVisitGenerator {
  constructor(amount) {
    this.amount = amount
  }
  create() {
    const visits = []
    for (let i = 0; i < this.amount; i++) {
      visits.push({
        count: Math.floor(Math.random() * SEED_VISIT_MAX),
      })
    }
    return visits
  }
}
class RandomProjectGenerator {
  constructor(users, visits) {
    this.users = users
    this.visits = visits
  }
  create() {
    const projects = []
    let count = 0
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < SEED_AMOUNT; j++) {
        const coverImage = randomPublicImage('projects')
        const project = {
          userId: this.users[i].id,
          title: 'Simple Project Title',
          description: faker.lorem.paragraphs(10),
          cover: coverImage,
          coverSmall: '/images/covers_small/' + coverImage.split('/')[3],
          coverPosition: 50,
          visitId: this.visits[count].id,
        }
        projects.push(project)
        count++
      }
    }
    return projects
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // get user
    const users = await User.findAll({ raw: true })

    // create visits (users * 5)
    const totalVisit = users.length * SEED_AMOUNT
    const visits = new RandomVisitGenerator(totalVisit).create()
    await queryInterface.bulkInsert('Visits', visits)
    const visitsData = await Visit.findAll({
      offset: users.length,
      raw: true,
    })

    // create projects
    const projects = new RandomProjectGenerator(users, visitsData).create()

    return queryInterface.bulkInsert('Projects', projects)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {})
  },
}
