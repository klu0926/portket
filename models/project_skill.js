'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project_Skill extends Model {
    static associate(models) {
      // define association here
    }
  }
  Project_Skill.init({
    projectId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project_Skill',
  });
  return Project_Skill;
};