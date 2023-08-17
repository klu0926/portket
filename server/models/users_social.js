'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users_Social.init({
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users_Social',
  });
  return Users_Social;
};