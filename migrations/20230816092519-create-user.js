'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '無名的創造者',
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/PiJ0HXw.png',
      },
      cover: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/xZoHPfC.png',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '自由工作者',
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '我是熱愛學習與成長的個體，喜歡挑戰各種新事物，不斷追求進步',
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  },
}
