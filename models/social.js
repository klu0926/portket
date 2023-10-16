'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Social extends Model {
    static associate(models) {}
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
