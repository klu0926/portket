'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      // define association here
      Theme.belongsTo(models.User)
    }
  }
  Theme.init({
    primary: DataTypes.STRING,
    secondary: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theme',
  });
  return Theme;
};