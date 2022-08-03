require('dotenv').config()
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb://127.0.0.1:27017/yelpcamp").then(console.log('connected'));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const num = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:'  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolor vel nisi ipsam nemo! Accusamus.',
            price:num
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})