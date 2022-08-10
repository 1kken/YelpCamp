const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const reviewCampground = new Schema({
    body:String,
    rating:Number
})

module.exports = model('Review', reviewCampground); 