//server dependancies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
//connection string
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected"))
  .catch((err) => console.log(err));

const home = require("./routes/home");
app.use("/", home);
app.listen(3000);

