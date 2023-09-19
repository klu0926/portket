'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      // define association here
      Skill.belongsToMany(models.User, {
        through: models.User_Skill,
        foreignKey: 'skillId',
        as: 'users',
      })
      Skill.belongsToMany(models.Project, {
        through: models.Project_Skill,
        foreignKey: 'skillId',
        as: 'projects'
      })
    }
  }
  Skill.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Skill',
    }
  )
  return Skill
}
