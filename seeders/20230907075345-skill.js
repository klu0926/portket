'use strict'
const skillData = require('../data/skill.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const skills = skillData.map((s) => ({
      name: s.name,
      description: s.description,
      icon: s.icon,
    }))
    return queryInterface.bulkInsert('Skills', skills)

  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Skills')
  },
}
