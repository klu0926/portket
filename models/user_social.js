'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Social extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Social.belongsTo(models.User)
      User_Social.hasOne(models.Social)
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
  return User_Social;
};