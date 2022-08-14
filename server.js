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
const appError = require('./Utilities/ExpressError');
//connection string
mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected"))
  .catch((err) => console.log(err));

const campground = require("./routes/campground");
app.use("/campground", campground);


app.use((req,res,next) =>{
  next(new appError(404, 'Page not found'))
});

app.use((err,req,res,next) =>{
  const {statusCode = 500,message = 'Something went wrong'} = err;
  res.render('error',{statusCode});
});


app.listen(3000);
