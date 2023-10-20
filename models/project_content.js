'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project_Content extends Model {
    static associate(models) {
      Project_Content.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: 'project',
      })
    }
  }
  Project_Content.init(
    {
      projectId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      content: DataTypes.TEXT,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Project_Content',
    }
  )
  return Project_Content
}
