const { Router } = require("express");
const express = require("express");
const { findById } = require("../models/campground");
const home = express.Router();
const campGround = require("../models/campground");
const methodOverride = require('method-override')

//show all campGrounds
home.get("/", async (req, res) => {
  const datas = await campGround.find({});
  res.render("campground/index", { datas });
});

//Show form page
home.get("/new", (req, res) => {
  res.render("campground/createCamp");
});

//show individual campground
home.get("/:id", async (req, res) => {
  const id = req.params.id;
  const datas = await campGround.findById(id);
  res.render("campground/show", { datas });
});

//Add new Camp ground
home.post("/", inputValidator, async (req, res) => {
  const datas = req.camp;
  const newCamp = new campGround({
    title: datas.title,
    location: datas.location,
  });
  const saved = await newCamp.save();
  res.redirect(`/${saved._id}`);
});
//Show edit page
home.get("/:id/edit",async (req,res)=>{
  const id = req.params.id;
  const datas = await campGround.findById(id);
  res.render('campground/editPage',{datas});
})

//use method overriding
home.use(methodOverride('_method'));

//Edit Camp ground
home.patch("/:id/edit",inputValidator,async (req,res)=>{
    const datas = req.body;
    const id  = req.params.id;
    const {title,location} = datas;
    const updated = await campGround.findByIdAndUpdate(id,{$set:{title:title,location:location}},{returnDocument:"after"});
    res.redirect(`/${id}`);
    console.log(updated)
})

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
