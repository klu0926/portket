'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

const SEED_PASSWORD = '123'
const SEED_AMOUNT = 10

class RandomUserGenerator {
  constructor() {
    this.currentNumber = 1
    this.avatarSize = '300'
  }
  create() {
    const randomId = Math.random().toString(36).slice(-8)
    const newUser = {
      name: faker.person.fullName(),
      email: `user${this.currentNumber}@example.com`,
      password: bcrypt.hashSync(SEED_PASSWORD),
      avatar: 'https://i.pravatar.cc/' + this.avatarSize + '?u=' + randomId,
      cover: 'https://i.imgur.com/xZoHPfC.png',
      title: faker.person.jobTitle(),
      description: faker.person.bio(),
      country: faker.location.country(),
      city: faker.location.city(),
      phone: faker.phone.number(),
    }
    this.currentNumber++
    return newUser
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = []
    const randomUser = new RandomUserGenerator()
    for (let i = 1; i < SEED_AMOUNT; i++) {
      users.push(randomUser.create())
    }
    return queryInterface.bulkInsert('Users', users)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
