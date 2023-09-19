'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { as: 'user' })
      Project.hasMany(models.Project_Image, { foreignKey: 'projectId', as: 'images' })
      Project.hasMany(models.Project_Link, { foreignKey: 'projectId', as: 'links' })
      Project.belongsToMany(models.Skill, {
        through: models.Project_Skill,
        foreignKey: 'projectId',
        as: 'skills',
      })
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      cover: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  )
  return Project
}
