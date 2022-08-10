const mongoose = require('mongoose');
const {Schema, model} = mongoose

const groundSchema = new Schema({
    title:String,
    price:Number,
    image:String,
    description:String,
    location:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = model('campgroundSchema', groundSchema)