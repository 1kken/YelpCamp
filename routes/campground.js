const { Router } = require("express");
const express = require("express");
const { findById } = require("../models/campground");
const home = express.Router();
const campGround = require("../models/campground");
const methodOverride = require("method-override");
const catchAsync = require("../Utilities/CatchAsync");
const Joi = require("joi");
const { Error } = require("mongoose");
//use method overriding
home.use(methodOverride("_method"));

//show all campGrounds
home.get(
  "/",
  catchAsync(async (req, res) => {
    const datas = await campGround.find({});
    res.render("campground/index", { datas });
  })
);

//Show form page
home.get("/new", (req, res) => {
  res.render("campground/createCamp");
});

//show individual campground
home.get(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const datas = await campGround.findById(id);
    res.render("campground/show", { datas });
  })
);

//Add new Camp ground
home.post(
  "/",
  inputValidator,
  catchAsync(async (req, res) => {
    const datas = req.camp;
    const newCamp = new campGround({
      title: datas.title,
      location: datas.location,
      image: datas.image,
      price: datas.price,
      description: datas.description,
    });
    const saved = await newCamp.save();
    res.redirect(`campground/${saved._id}`);
  })
);

//Show edit page
home.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const datas = await campGround.findById(id);
    res.render("campground/editPage", { datas });
  })
);

//Edit Camp ground
home.put(
  "/:id",
  inputValidator,
  catchAsync(async (req, res) => {
    const datas = req.camp;
    const id = req.params.id;
    const { title, location,description,image,price} = datas;
    try {
      await campGround.findByIdAndUpdate(
        id,
        { $set: { title: title, location: location, description:description,image:image,price:price} },
        { returnDocument: "after" }
      );
    } catch (error) {
      console.log("something went bad");
    }
    res.redirect(`/campground/${id}`);
  })
);

//Delete Camp Ground
home.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    await campGround.findByIdAndDelete(id);
    res.redirect("/campground");
  })
);

//middlewares
function inputValidator(req, res, next) {
  const { title, location, image, description, price } = req.body;
  const schema = Joi.object({
    S_title: Joi.string().required(),
    S_location: Joi.string().required(),
    S_image: Joi.string().required(),
    S_description: Joi.string().required(),
    S_price: Joi.number().required().min(1),
  });
  const { error, value } = schema.validate({
    S_title: title,
    S_location: location,
    S_image: image,
    S_description: description,
    S_price: price,
  });
  if (!error) {
    req.camp = req.body;
  } else {
    throw new Error('Invalid input');
  }
  next();
}

module.exports = home;
