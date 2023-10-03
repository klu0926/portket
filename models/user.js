'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Theme)
      User.hasMany(models.Project, {
        foreignKey: 'userId',
        as: 'projects',
        onDelete: 'CASCADE',
      })
      User.belongsToMany(models.Social, {
        through: models.User_Social,
        foreignKey: 'userId',
        as: 'socials',
        onDelete: 'CASCADE',
      })
      User.belongsToMany(models.Skill, {
        through: models.User_Skill,
        foreignKey: 'userId',
        as: 'skills',
        onDelete: 'CASCADE',
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      cover: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
