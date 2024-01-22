'use strict'
const { User } = require('../models')
const { faker } = require('@faker-js/faker')
const startAndEndDate = require('../helper/startAndEndDate')

const DUMMY_LINK = '/html/dummy-page.html'
const SEED_AMOUNT = 3 // 3 task per user
const TASKS = [
  // 3 tasks (add more if needed)
  'Create a project timeline for the upcoming product launch, coordinating with departments and setting milestones',
  'Conduct a market analysis to identify emerging trends and opportunities for our upcoming strategy meeting',
  'Compile and analyze recent customer feedback data to refine product features and enhance user satisfaction',
]
const TASKS_STRING = TASKS.join(',')

class RandomWorkGenerator {
  constructor(users) {
    this.users = users
  }
  create() {
    const works = []
    const workPeriods = startAndEndDate(SEED_AMOUNT)
    // in array = [[set 1], [set 2]]
    // in a set [end, start]

    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < SEED_AMOUNT; j++) {
        const work = {
          title: faker.person.jobTitle(),
          companyLogo: '', // currently empty
          companyName: faker.company.name(),
          companyDescription: faker.lorem.paragraph(),
          companySize: '500',
          companyLink: DUMMY_LINK,
          startDate: workPeriods[j][1],
          endDate: workPeriods[j][0],
          jobDescription: faker.lorem.paragraph(),
          // this is a array like string, with ',' as separator
          responsibility: TASKS_STRING,
          userId: this.users[i].id,
        }
        works.push(work)
      }
    }
    return works
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // get users
    const users = await User.findAll({ raw: true })

    // create works
    const works = new RandomWorkGenerator(users).create()
    return queryInterface.bulkInsert('Works', works)
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Works', null, {})
  },
}
