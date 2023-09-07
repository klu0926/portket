'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Skill extends Model {
    static associate(models) {
      // define association here
      User_Skill.belongsTo(models.User)
      User_Skill.hasOne(models.Skill)
    }
  }
  User_Skill.init(
    {
      userId: DataTypes.INTEGER,
      skillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Skill',
    }
  )
  return User_Skill
}
