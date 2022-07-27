//server dependancies
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));

//connection string
mongoose.connect(process.env.MONGODB_URI).then(console.log('Connected')).catch(err => console.log(err));


app.get("/", (req,res)=>{
    res.render('home');
})
app.listen(3000)