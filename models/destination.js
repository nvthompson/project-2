const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required:true},
    restaurants: {type: String, required: true},
    museums: {type:String, required: true},
    attractions: {type:String, required: false},
},{timestamps:true});

module.exports = mongoose.model('Destination', destinationSchema);