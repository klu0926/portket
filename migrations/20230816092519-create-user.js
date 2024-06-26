'use strict'
const { sequelize } = require('../models')
const randomPublicImage = require('../helper/randomPublicImage')
const cover = randomPublicImage('covers')
const smallCover = '/images/covers_small/' + cover.split('/')[3]

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
        defaultValue: 'New Portket User',
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
        defaultValue: '/images/avatar.webp',
      },
      avatarSmall: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '/images/avatar.webp',
      },
      cover: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: cover,
      },
      coverSmall: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: smallCover,
      },
      coverPosition: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 50,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'New Portket User',
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000),
        defaultValue:
          "Experienced professional with a diverse background. Skilled in various areas. Committed to excellence and growth. Enjoys learning and exploring new opportunities. Let's connect and discuss potential collaborations.",
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
      themeId: {
        type: Sequelize.INTEGER,
      },
      visitId: {
        type: Sequelize.INTEGER,
        references: { model: 'Visits', key: 'id' },
        onDelete: 'CASCADE',
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
