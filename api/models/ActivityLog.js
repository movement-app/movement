"use strict";
const { Model } = require("sequelize");

/**
 * A model to save user's daily run logs to the database.
 * 
 * It has the following custom fields:
 * 1. description (STRING): Description/title of the run 
 * 2. distance (FLOAT): Distance ran (in miles)
 * 3. start_time (TIME): Start time of the run
 * 4. end_time (TIME): End time of the run; Must be later than the start time
 * 5. date (DATEONLY): Date of the run
 * 
 * It also has the following automatically generated fields:
 * 1. id (INTEGER): Unique identifier for each record (auto-incremented)
 * 2. created_at (TIME): Timestamp of the time the record was created
 * 3. updated_at (TIME): Timestamp of the time the record was updated
 */
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {}

  ActivityLog.init(
    {
      description: {
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
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
        }
      },
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );

  ActivityLog.associate = (models) => {
    // Each record in the AcitivityLog table belongs to a registered user in the User table.
    // A record cannot be created without a specified user.
    ActivityLog.belongsTo(models.User, {
        //foreignKey: 'userId',
        onDelete: 'CASCADE',
    })
  };

  return ActivityLog;
};