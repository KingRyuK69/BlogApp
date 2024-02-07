module.exports = (sequelize, DataTypes) => {
  const User_info = sequelize.define(
    "user_info",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name should not be empty",
          },
          len: {
            args: [2, 100],
            msg: "Name should be between 2 and 100 characters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: ["^[0-9]{10}$"], // regular expression for exactly 10 digits
            msg: "Incorrect Phone Number syntax",
          },
        },
      },
      likes: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Likes should not be empty",
          },
          isIn: {
            args: [
              [
                "sports",
                "comics",
                "movies",
                "music",
                "tech",
                "news",
                "anime",
                "games",
              ],
            ],
            msg: "Likes should be one of: sports, comics, etc.",
          },
        },
      },
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      base64Image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password should not be empty",
          },
          len: {
            args: [8, 100],
            msg: "Password should be between 8 and 100 characters long",
          },
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return User_info;
};
