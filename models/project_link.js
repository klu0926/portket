'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_Link extends Model {
    static associate(models) {
      // define association here
      Project_Link.belongsTo(models.Project)
    }
  }
  Project_Link.init({
    projectId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project_Link',
  });
  return Project_Link;
};