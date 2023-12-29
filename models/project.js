'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
      Project.hasMany(models.Project_Link, {
        foreignKey: 'projectId',
        as: 'links',
        onDelete: 'CASCADE',
      })
      Project.hasMany(models.Project_Content, {
        foreignKey: 'projectId',
        as: 'contents',
        onDelete: 'CASCADE',
      })
      Project.belongsToMany(models.Skill, {
        through: models.Project_Skill,
        foreignKey: 'projectId',
        as: 'skills',
        onDelete: 'CASCADE',
      })
      Project.belongsTo(models.Visit, {
        foreignKey: 'visitId',
        as: 'visits',
        onDelete: 'CASCADE',
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
      coverSmall: DataTypes.STRING,
      coverPosition: DataTypes.FLOAT,
      visitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Project',
    }
  )
  return Project
}
