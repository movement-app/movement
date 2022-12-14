"use strict";
const { Model } = require("sequelize");

/**
 * A model to store all the challenges created on the app.
 * 
 * It has the following custom fields:
 * 1. match_id (UUID): A unique identifier automatically generated as UUID for each challenge created. 
 *                     This can be used by users to join the challenge. 
 * 2. title (STRING): The title of the challenge that will be used to display the challenge on the user's dashboard.
 * 3. distance (FLOAT): The distance both users need to run to complete the challenge. Whoever reaches this number first wins.
 * 4. deadline (DATE): The timestamp for when the challenge should be completed by. 
 *                     If neither participant reaches the distance by the deadline, the closest (by difference) wins.
 * 5. donation_amount (FLOAT): The amount of donation (in USD) the loser agrees to donate to charity upon completion 
 *                             of the challenge.
 * 6. status (BOOLEAN): The active status of the challenge (active/expired)
 * 
 * It also has the following automatically generated fields:
 * 1. id (INTEGER): Unique identifier for each record (auto-incremented)
 * 2. created_at (TIME): Timestamp of the time the record was created
 * 3. updated_at (TIME): Timestamp of the time the record was updated
 */
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {}

  Challenge.init(
    {
      match_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
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
    // Each record in the Challenge table belongs to multiple registered users in the User table.
    Challenge.belongsToMany(models.User, {
        through: 'userchallenge',
    })

    // Each record in the Challenge table is linked with one charity from the Charity table.
    Challenge.belongsTo(models.Charity, {
        onDelete: 'CASCADE',
    })
  };

  return Challenge;
};