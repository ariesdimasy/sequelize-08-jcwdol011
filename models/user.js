"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.task, {
        foreignKey: "userId",
      });
      models.task.belongsTo(User);

      User.hasMany(models.UserSkill, {
        foreignKey: "userId",
      });
      models.UserSkill.belongsTo(User);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
      },
      gender: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
