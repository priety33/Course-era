const express= require('express');
const bodyParser= require('body-parser');
const { Mongoose } = require('mongoose');
var authenticate = require('../authenticate');

const Promos= require('../models/promotions');

const promotionRouter= express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
 .get((req,res,next) => {
     Promos.find({})
     .then((promos) => {
          if(promos!=null) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(promos);
          }
          else {
              err= new Error('Promotions doesnt exist');
              err.statusCode= 404;
              return next(err);
          }
     })
     .catch((err) => next(err));
 })
 .post(authenticate.verifyUser, (req,res,next) => {
     Promos.create(req.body)
     .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
     })
     .catch((err) => next(err));
 })
 .put(authenticate.verifyUser, (req,res,next) => {
     res.statusCode= 403;
     res.end('PUT operation not supported on /promotions');
 })
.delete(authenticate.verifyUser, (req,res,next) => {
     Promos.remove({})
     .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     })
     .catch((err) => next(err));
 });

promotionRouter.route('/:promoId')
.get((req,res,next) => {
    Promos.findById(req.params.promoId) 
    .then((promo) => {
        if(promo!=null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }
        else {
            err= new Error('Promotion: '+req.params.promoId+ ' doesnt exist');
            err.statusCode= 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req,res,next) => {
    res.statusCode= 403;
    res.end('POST operation not supported on /promotions/'
       + req.params.promotionId);
})
.put(authenticate.verifyUser, (req,res,next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set : req.body
    }, { new : true } )
    .then((promo) => {
        if(promo!=null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        }
        else {
            err= new Error('Promotion: '+ req.params.promoId+ ' doesnt exist');
            err.statusCode= 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req,res,next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err));
});

 module.exports= promotionRouter;