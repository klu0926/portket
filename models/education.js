'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
    }
  }
  Education.init(
    {
      name: DataTypes.STRING,
      degree: DataTypes.STRING,
      major: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Education',
    }
  )
  return Education
}
