'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    static associate(models) {
      Visit.hasOne(models.User, {
        foreignKey: 'visitId',
      })
      Visit.hasOne(models.Project, {
        foreignKey: 'visitId',
      })
    }
  }
  Visit.init(
    {
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Visit',
    }
  )
  return Visit
}
