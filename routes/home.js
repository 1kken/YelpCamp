const { Router } = require("express");
const express = require("express");
const home = express.Router();
const campGround = require("../models/campground");

home.get("/", async (req, res) => {
  const datas = await campGround.find({});
  res.render("campground/index", { datas });
});

home.get("/:id", async (req, res) => {
  const id = req.params.id;
  const datas = await campGround.findById(id);
  res.render("campground/show", { datas });
});

home.get("/createNew", async (req, res) => {
  res.send("hello!");
});
console.log("hello world!");
module.exports = home;
