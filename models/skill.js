"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Skill.hasMany(models.UserSkill, {
        foreignKey: "skillId",
      });
      models.UserSkill.belongsTo(Skill);
    }
  }
  Skill.init(
    {
      skill: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skill",
    }
  );
  return Skill;
};
