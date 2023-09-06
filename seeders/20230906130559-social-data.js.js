'use strict'
const socialData = require('../data/social.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const socialsData = Object.keys(socialData).map((key) => ({
      name: key,
      icon: socialData[key],
    }))
    return queryInterface.bulkInsert('Socials', socialsData)
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Socials', null, {})
  },
}
