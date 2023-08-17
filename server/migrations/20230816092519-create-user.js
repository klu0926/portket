"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "無名的創造者"
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
        defaultValue: "https://i.imgur.com/PiJ0HXw.png",
      },
      cover: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "https://i.imgur.com/xZoHPfC.png",
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "歡迎來到我的PORTKET空間！",
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue:
          "這是我分享創意和靈感的地方。無論你是誰，我都希望你在這裡找到一些啟發和有趣的內容",
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users")
  },
}
