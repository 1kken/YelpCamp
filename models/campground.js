const mongoose = require('mongoose');
const {Schema, model} = mongoose

const groundSchema = new Schema({
    title:String,
    price:String,
    description:String,
    location:String
})

module.exports = model('campgroundSchema', groundSchema)