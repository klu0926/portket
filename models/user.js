'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Theme)
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    cover: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};