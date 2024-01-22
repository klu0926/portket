'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Works', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
      },
      companyLogo: {
        type: Sequelize.STRING,
      },
      companyName: {
        type: Sequelize.STRING,
      },
      companyDescription: {
        type: Sequelize.TEXT,
      },
      companySize: {
        type: Sequelize.STRING,
      },
      companyLink: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      jobDescription: {
        type: Sequelize.TEXT,
      },
      responsibility: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Works')
  },
}
