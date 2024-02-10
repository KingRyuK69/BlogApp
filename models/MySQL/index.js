const dbConfig = require("../../config/dbConfig");
// console.log("dbConfig", dbConfig);
const { Sequelize, DataTypes } = require("sequelize"); //create a new sequelize instance uding the db configuration

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect, // specifies the db type you're connecting to
  logging: false,
});

sequelize
  .authenticate() //authenticate connection to the db
  .then(() => {
    console.log("DB Connected".bgWhite);
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db1 = {}; //creates an empty object db1 and assigns the sequelize instance and library to it

db1.Sequelize = Sequelize; // instance
db1.sequelize = sequelize; // library

db1.users_info = require("./userModel")(sequelize, DataTypes);
db1.user_articles = require("./articlesModel")(sequelize, DataTypes);

db1.users_info.hasMany(db1.user_articles, {
  foreignKey: "user_id",
  as: "articles",
});

db1.user_articles.belongsTo(db1.users_info, {
  foreignKey: "user_id",
  as: "user_info",
});

module.exports = db1;
