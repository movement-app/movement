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
          startTimeAfterEndTime(time) {
            if (this.start_time.isAfter(time)) {
              throw new Error('Start time must be before the end time.');
            }
          }
        }
      },
      date: {
        type: DataTypes.DATEONLY,
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
        }, 
        onDelete: 'CASCADE',
    })
  };

  return ActivityLog;
};