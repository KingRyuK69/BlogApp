const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

require("colors");

const app = express();

const routes = require("./routes/userRoute");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/users", routes);

app.get("/", (req, res) => {
  res.send("Blog Home Page!");
});

app.listen(PORT, () => {
  console.log(
    `Server connected in ${process.env.NODE_ENV} mode on port ${PORT}`.bgMagenta
  );
});
