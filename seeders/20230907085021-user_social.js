'use strict'
const { User, Social } = require('../models')
const { errorHandler } = require('../helper')

const SOCIAL_COUNT = 4
const DUMMY_LINK = '/html/dummy-page.html'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const usersData = await User.findAll({
        raw: true,
      })
      const socialsData = await Social.findAll({
        raw: true,
      })

      if (!usersData || !socialsData) Error('Can not find user or social data')
      // construct users_social seeder data
      const usersSocialData = []

      usersData.forEach((user) => {
        const socialIdSet = new Set()
        while (socialIdSet.size !== SOCIAL_COUNT) {
          socialIdSet.add(Math.floor(Math.random() * socialsData.length))
        }
        socialIdSet.forEach((socialId) => {
          usersSocialData.push({
            link: DUMMY_LINK,
            userId: user.id,
            socialId,
          })
        })
      })
      return queryInterface.bulkInsert('User_Socials', usersSocialData)
    } catch (error) {
      errorHandler(error)
    }
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User_Socials', null, {})
  },
}
