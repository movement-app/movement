"use strict";
const { Model } = require("sequelize");

/**
 * A model to store all the supported charities on the app and their information.
 * 
 * It has the following custom fields:
 * 1. name (STRING): Name of the charitable organization
 * 2. category (STRING): The type/purpose of the organization; Ex. Education, Healthcare, Cancer Research, Emergency Relief, etc.
 * 3. link (STRING): A link to the organization's website or a direct link to donte on their page
 * 
 * It also has the following automatically generated fields:
 * 1. id (INTEGER): Unique identifier for each record (auto-incremented)
 * 2. created_at (TIME): Timestamp of the time the record was created
 * 3. updated_at (TIME): Timestamp of the time the record was updated
 */
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
    // Each record in the Charity model belongs to many challenges in the Challenge model.
    Charity.belongsToMany(models.Challenge, {
        through: 'challengecharity',
        onDelete: 'CASCADE',
    })
  };

  return Charity;
};