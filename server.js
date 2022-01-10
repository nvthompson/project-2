const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Destination = require('./models/destination')
const destinationsController = require('./controllers/destinations')
// initialize the express app
const app = express();
// configure server settings
require('dotenv').config();

//database connection
const {PORT = 3000, DATABASE_URL} = process.env;
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.subscribe(morgan('morgan'));

//routes
app.get('/', (req,res) => res.redirect('/destinations'));

app.use('/destinations', destinationsController)

//listener
app.listen(PORT, () =>{
    console.log(`server is listening on port: ${PORT}`)
})