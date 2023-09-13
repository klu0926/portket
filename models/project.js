'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Project.hasMany(models.Project_Image)
      Project.hasMany(models.Project_Link)
    }
  }
  Project.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
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
