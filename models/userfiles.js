'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      UserFiles.hasOne(models.Files,{
        as:"Files",
        foreignKey:"id",
        sourceKey:"FileId"
      });
    }
  }
  UserFiles.init({
    userId: DataTypes.INTEGER,
    FileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserFiles',
  });
  return UserFiles;
};