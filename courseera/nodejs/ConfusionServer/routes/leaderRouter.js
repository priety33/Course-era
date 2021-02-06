const express= require('express');
const bodyParser= require('body-parser');
const {Mongoose} = require('mongoose');
var authenticate = require('../authenticate');

const leaderRouter= express.Router();
const Leaders= require('../models/leaders.js');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
 .get((req,res,next) => {
     Leaders.find({})
     .then((leaders) => {
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
     })
     .catch((err) => next(err));
 })
 .post(authenticate.verifyUser, (req,res,next) => {
     Leaders.create(req.body)
     .then((leader) => {
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
     })
     .catch((err) => next(err));
 })
 .put(authenticate.verifyUser, (req,res,next) => {
     res.statusCode= 403;
     res.end('PUT operation not supported on /leaders');
 })
.delete(authenticate.verifyUser, (req,res,next) => {
     Leaders.remove({})
     .then((resp) => {
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     })
     .catch((err) => next(err));
 });

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        if(leader!=null) {
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else {
            err= new Error('Leacer not found');
            err.statusCode= 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
    res.statusCode= 403;
    res.end('POST operation not supported on /leaders/'
       + req.params.leaderId);
})
.put(authenticate.verifyUser, (req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, 
    { $set : req.body} , { new : true })
    .then((leader) => {
        if(leader!=null) {
            res.statusCode= 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }
        else {
            err= new Error('Leader not found');
            err.statusCode= 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode= 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

 module.exports= leaderRouter;