"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {}

  Challenge.init(
    {
      match_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDv4,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isNumeric: true,
        }
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
      },
      donation_amount: {
        type: DataTypes.FLOAT,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Challenge",
    }
  );

  Challenge.associate = (models) => {
    // associations can be defined here
    Challenge.belongsToMany(models.User, {
        through: 'userchallenge',
    })
  };

  return Challenge;
};