const { Router } = require('express');
const express = require('express');
const home = express.Router();
const campGround = require('../models/campground');

home.get('/',async (req,res)=>{
    const datas = await campGround.find({}); 
    res.render('campground/index',{datas})   
})


module.exports = home;