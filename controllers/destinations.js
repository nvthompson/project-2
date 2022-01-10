const express = require('express');
const destinationsRouter = express.Router();
const Destination = require('../models/destination');

//index
destinationsRouter.get('/', (req,res) =>{
    Destination.find({},(err, destinations) =>{
        res.render('index.ejs', {destinations});
    });
})
//new
destinationsRouter.get('/new', (req,res)=>{
    res.render('new.ejs')
})
//delete
destinationsRouter.delete('/:id', (req,res) =>{
    Destination.findByIdAndDelete(req.params.id, (err,data)=>{
        res.redirect('/destinations')
    })
})
//update
destinationsRouter.put('/:id', (req,res) =>{
    Destination.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedDestination) =>{
            res.redirect(`/destinations/${req.params.id}`)
        }
    )
})
//create
destinationsRouter.post('/', (req,res)=>{
    Destination.create(req.body, (err, destination)=>{
        res.redirect('/destinations')
    })
})

//edit
destinationsRouter.get('/:id/edit', (req,res) =>{
    Destination.findById(req.params.id, (err, destination)=>{
        res.render('edit.ejs', {destination})
    })
})
//show
destinationsRouter.get('/:id', (req,res) =>{
    Destination.findById(req.params.id, (err, destination) =>{
        res.render('show.ejs', {destination});
    })
})

module.exports = destinationsRouter;