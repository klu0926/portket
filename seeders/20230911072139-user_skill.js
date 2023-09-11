'use strict'
const { User, Skill } = require('../models')
const { errorHandler } = require('../helper')

const SKILL_COUNT = 6

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const usersData = await User.findAll({
        raw: true,
      })
      const skillsData = await Skill.findAll({
        raw: true,
      })

      if (!usersData || !skillsData) Error('Can not find user or skill data')
      const usersSkillData = []

      usersData.forEach((user) => {
        const skillIndexSet = new Set()
        while (skillIndexSet.size !== SKILL_COUNT) {
          skillIndexSet.add(Math.floor(Math.random() * skillsData.length))
        }
        skillIndexSet.forEach((index) => {
          usersSkillData.push({
            userId: user.id,
            skillId: skillsData[index].id,
          })
        })
      })
      return queryInterface.bulkInsert('User_Skills', usersSkillData)
    } catch (error) {
      errorHandler(error)
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_Skills', null, {})
  },
}
