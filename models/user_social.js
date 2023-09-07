'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User_Social extends Model {
    static associate(models) {
      // define association here
      // this is a join model for User and Social
    }
  }
  User_Social.init(
    {
      link: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      socialId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Social',
    }
  )
  return User_Social
}
