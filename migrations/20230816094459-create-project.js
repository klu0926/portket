'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
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
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      cover: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'https://placehold.co/600x400',
      },
      coverPosition: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 50,
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
    await queryInterface.dropTable('Projects')
  },
}
