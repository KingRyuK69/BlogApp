const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
require("colors");

// import mongo connection
const connectDB = require("./config/dbMongo");

const app = express();

// set up view (frontend)
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establishing connection with MongoDB
connectDB();

// import universal routes file
const routes = require("./routes/indexRoute");
app.use("/api/users", routes);

const PORT = process.env.PORT || 5001;

// dev server
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/blogs", (req, res) => {
  res.render("blog");
});

app.listen(PORT, () => {
  console.log(
    `Server connected in ${process.env.NODE_ENV} mode on port ${PORT}`.bgMagenta
  );
});
