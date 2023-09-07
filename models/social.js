'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Social extends Model {
    static associate(models) {
      // define association here
      Social.belongsToMany(models.User, {
        through: models.User_Social,
        foreignKey: 'socialId',
      })
    }
  }
  Social.init(
    {
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Social',
    }
  )
  return Social
}
