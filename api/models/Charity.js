"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Charity extends Model {}

  Charity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Charity",
    }
  );

  Charity.associate = (models) => {
    // associations can be defined here
    Charity.belongsToMany(models.Challenge, {
        through: 'challengecharity',
        onDelete: 'CASCADE',
    })
  };

  return Charity;
};