const express = require("express");
const morgan = require("morgan");
// import mongo connection
const connectDB = require("./config/dbMongo");

require("dotenv").config();

require("colors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establishing connection with MongoDB
connectDB();

const routes = require("./routes/indexRoute");
app.use("/", routes);

app.use("/api/users", routes);

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/home", (req, res) => {
  res.send("Blog Home Page!");
});

app.listen(PORT, () => {
  console.log(
    `Server connected in ${process.env.NODE_ENV} mode on port ${PORT}`.bgMagenta
  );
});
