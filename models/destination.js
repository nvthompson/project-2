const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required:true},
},{timestamps:true});

module.exports = mongoose.model('Destination', destinationSchema);