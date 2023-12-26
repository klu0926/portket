'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
const descriptionData = require('../data/description.json')
const randomImage = require('../helper/randomPublicImage')
const { Visit } = require('../models')

// eg: email: user1@example.com \ password : 123
// eg; email: user7@example.com \ password : 123
const SEED_PASSWORD = '123'
const SEED_AMOUNT = 100
const SEED_AVATAR_SIZE = '400'
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
class RandomUserGenerator {
  constructor(amount, visits) {
    this.amount = amount
    this.visits = visits
    this.avatarSize = SEED_AVATAR_SIZE
  }
  create() {
    const users = []
    for (let i = 0; i < this.amount; i++) {
      const randomId = Math.random().toString(36).slice(-8)
      const newUser = {
        name: faker.person.fullName(),
        email: `user${i + 1}@example.com`,
        password: bcrypt.hashSync(SEED_PASSWORD),
        avatar: 'https://i.pravatar.cc/' + this.avatarSize + '?u=' + randomId,
        cover: randomImage('covers'),
        coverPosition: 50,
        title: faker.person.jobTitle(),
        description: descriptionData[i % descriptionData.length],
        country: faker.location.country(),
        city: faker.location.city(),
        phone: faker.phone.number('###-###-###'),
        visitId: this.visits[i].id,
      }
      users.push(newUser)
    }
    return users
  }
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create visit
    const visits = new RandomVisitGenerator(SEED_AMOUNT).create()
    await queryInterface.bulkInsert('Visits', visits)
    const visitsData = await Visit.findAll({
      raw: true,
    })

    // create user
    const users = new RandomUserGenerator(SEED_AMOUNT, visitsData).create()
    return queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Visits', null, {})
    return queryInterface.bulkDelete('Users', null, {})
  },
}
