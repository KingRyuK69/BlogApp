module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "article",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title should not be empty",
          },
          len: {
            args: [5, 100],
            msg: "Title should be between 5 to 100 characters long",
          },
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Body should not be empty",
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users_info",
          key: "user_id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Article;
};
