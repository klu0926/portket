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
      User.hasMany(models.User_Social, {
        foreignKey: 'userId',
        as: 'socials',
        onDelete: 'CASCADE',
      })
      User.hasMany(models.Work, {
        foreignKey: 'userId',
        as: 'works',
        onDelete: 'CASCADE',
      })
      User.belongsToMany(models.Skill, {
        through: models.User_Skill,
        foreignKey: 'userId',
        as: 'skills',
        onDelete: 'CASCADE',
      })
      User.belongsTo(models.Visit, {
        foreignKey: 'visitId',
        as: 'visits',
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
      avatarSmall: DataTypes.STRING,
      cover: DataTypes.STRING,
      coverSmall: DataTypes.STRING,
      coverPosition: DataTypes.FLOAT,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      themeId: DataTypes.INTEGER,
      visitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
