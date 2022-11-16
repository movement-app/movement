const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

/**
 * A model to store all registered users on the app.
 * 
 * It has the following custom fields:
 * 1. firstName (STRING): The user's first name
 * 2. lastName (STRING): The user's last name
 * 3. email (STRING): The user's email address
 * 4. passwordHash (STRING): The user's password as a hash value
 * 
 * It also has the following automatically generated fields:
 * 1. id (INTEGER): Unique identifier for each record (auto-incremented)
 * 2. created_at (TIME): Timestamp of the time the record was created
 * 3. updated_at (TIME): Timestamp of the time the record was updated
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getFullname() {
      return [this.firstName, this.lastName].join(" ");
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      passwordHash: { type: DataTypes.STRING },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          isLongEnough: (val) => {
            if (val.length < 7) {
              throw new Error("Please choose a longer password");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    // Each user in the User table has many activity logs in the ActivityLog table.
    User.hasMany(models.ActivityLog, {
      onDelete: 'CASCADE'
    })

    // Each user in the User table is a participant in many challenges from the Challenge table.
    User.belongsToMany(models.Challenge, {
      through: 'userchallenge',
    })
  };

  User.beforeSave((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};
