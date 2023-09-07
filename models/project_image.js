'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Project_Image extends Model {
    static associate(models) {
      // define association here
      Project_Image.belongsTo(models.Project)
    }
  }
  Project_Image.init(
    {
      projectId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Project_Image',
    }
  )
  return Project_Image
}
