'use strict'
const randomIndex = require('../helper/randomArrayIndex')
const { Project, Skill } = require('../models')
const errorHandler = require('../helper/errorHandler')

const SKILL_COUNT = 3

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const projects = await Project.findAll({ raw: true })
      const skills = await Skill.findAll({ raw: true })

      if (!projects || !skills) throw new Error('Can not find project or skill data')

      const projectSkills = []
      projects.forEach((project) => {
        const skillIndexSet = new Set()
        while (skillIndexSet.size !== SKILL_COUNT) {
          skillIndexSet.add(randomIndex(skills))
        }
        skillIndexSet.forEach((index) => {
          projectSkills.push({
            projectId: project.id,
            skillId: skills[index].id,
          })
        })
      })
      return queryInterface.bulkInsert('Project_Skills', projectSkills)
    } catch (err) {
      errorHandler(err, 'Project-Skill seeder')
    }
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Project_Skills', null, {})
  },
}
