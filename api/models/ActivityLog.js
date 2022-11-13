"use strict";
const { Model } = require("sequelize");

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
        validate: {
          startDateAfterEndDate() {
            if (this.start_time.isAfter(this.end_time)) {
              throw new Error('Start time must be before the end time.');
            }
          }
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
        }
      }
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );

  ActivityLog.associate = (models) => {
    // associations can be defined here
    ActivityLog.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
        }
    })
  };

  return ActivityLog;
};