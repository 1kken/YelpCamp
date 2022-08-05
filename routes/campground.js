const { Router } = require("express");
const express = require("express");
const { findById } = require("../models/campground");
const home = express.Router();
const campGround = require("../models/campground");
const methodOverride = require("method-override");
const catchAsync = require('../Utilities/CatchAsync');
const appError = require('../Utilities/ExpressError');

//use method overriding
home.use(methodOverride("_method"));

//show all campGrounds
home.get("/", catchAsync(async (req, res) => {
  const datas = await campGround.find({});
  res.render("campground/index", { datas });
}));

//Show form page
home.get("/new", (req, res) => {
  res.render("campground/createCamp");
});

//show individual campground
home.get("/:id", catchAsync(async (req, res) => {
  const id = req.params.id;
  const datas = await campGround.findById(id);
  res.render("campground/show", { datas });
}));

//Add new Camp ground
home.post("/", inputValidator, catchAsync(async (req, res) => {
  const datas = req.camp;
  const newCamp = new campGround({
    title: datas.title,
    location: datas.location,
    image: datas.image,
    price: datas.price,
    description: datas.description
  });
  const saved = await newCamp.save();
  res.redirect(`campground/${saved._id}`);
}));

//Show edit page
home.get("/:id/edit", catchAsync(async (req, res) => {
  const id = req.params.id;
  const datas = await campGround.findById(id);
  res.render("campground/editPage", { datas });
}));

//Edit Camp ground
home.put("/:id", inputValidator, catchAsync(async (req, res) => {
  const datas = req.body;
  const id = req.params.id;
  const { title, location } = datas;
  try {
    await campGround.findByIdAndUpdate(
      id,
      { $set: { title: title, location: location } },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.log("something went bad");
  }
  res.redirect(`/campground/${id}`);
}));

//Delete Camp Ground
home.delete("/:id", catchAsync(async (req, res) => {
  const id = req.params.id;
  const deleted = await campGround.findByIdAndDelete(id);
  res.redirect("/campground");
}));

//middlewares
async function inputValidator(req, res, next) {
  const datas = req.body;
  const { title, location } = datas;
  if (!title || !location) {
    return res.status(400).json({ message: "Null input" });
  } else {
    req.camp = datas;
    next();
  }
}

module.exports = home;
