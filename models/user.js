'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Role,{
        as:"Role",
        sourceKey:"RoleId",
        foreignKey:"id"
      });

      User.hasMany(models.UserFiles,{
        as:"UserFiles",
        foreignKey:"userId",
        sourceKey:"id"
      });
    }
  }
  User.init({
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
    UsedQuota: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};