'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    static associate(models) {
      // define association here
      Work.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })
    }
  }
  Work.init(
    {
      title: DataTypes.STRING,
      companyLogo: DataTypes.STRING,
      companyName: DataTypes.STRING,
      companyDescription: DataTypes.TEXT,
      companySize: DataTypes.STRING,
      companyLink: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      jobDescription: DataTypes.STRING,
      responsibility: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Work',
    }
  )
  return Work
}
