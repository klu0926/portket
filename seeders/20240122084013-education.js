'use strict'
const { User } = require('../models')
const startAndEndDate = require('../helper/startAndEndDate')
const randomArrayItem = require('../helper/randomArrayItem')
const educationDate = require('../data/education.json')

const SEED_AMOUNT = 1 // 1 education per user

function createEducation(user) {
  const userId = user.id
  // 48 min/max month, set false to 'toPresent' turn off last endDate set to year 9999
  const period = startAndEndDate(SEED_AMOUNT, 48, 48, false)

  return {
    userId,
    name: randomArrayItem(educationDate.schools),
    degree: randomArrayItem(educationDate.degrees),
    major: randomArrayItem(educationDate.majors),
    startDate: period[0][1],
    endDate: period[0][0],
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // get users
    const users = await User.findAll({ raw: true })

    // create education
    const education = []
    users.forEach((user) => {
      education.push(createEducation(user))
    })
    return queryInterface.bulkInsert('Education', education)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Education', null, {})
  },
}
