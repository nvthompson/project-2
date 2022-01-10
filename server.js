const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Destination = require('./models/destination')
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
//index
app.get('/destinations', (req,res) =>{
    Destination.find({},(err, destinations) =>{
        res.render('index.ejs', {destinations});
    });
})
//new
app.get('/destinations/new', (req,res)=>{
    res.render('new.ejs')
})
//delete
app.delete('/destinations/:id', (req,res) =>{
    Destination.findByIdAndDelete(req.params.id, (err,data)=>{
        res.redirect('/destinations')
    })
})
//update

//create
app.post('/destinations', (req,res)=>{
    Destination.create(req.body, (err, destination)=>{
        res.redirect('/destinations')
    })
})

//edit

//show
app.get('/destinations/:id', (req,res) =>{
    Destination.findById(req.params.id, (err, destination) =>{
        res.render('show.ejs', {destination});
    })
})

//listener
app.listen(PORT, () =>{
    console.log(`server is listening on port: ${PORT}`)
})