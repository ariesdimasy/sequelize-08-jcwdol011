"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSkill.belongsTo(models.Skill, {
        foreignKey: "skillId",
      });
      UserSkill.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.User.hasMany(UserSkill);
      models.Skill.hasMany(UserSkill);
    }
  }
  UserSkill.init(
    {
      userId: DataTypes.INTEGER,
      skillId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserSkill",
    }
  );
  return UserSkill;
};
