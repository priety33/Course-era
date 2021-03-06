var express = require('express');
const bodyParse = require('body-parser');
var User = require('../models/user');
var passport= require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  User.register(new User({ username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode= 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode= 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration successful'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token= authenticate.getToken({_id: req.user._id});
  res.statusCode= 200;
  res.setHeader('Content-Type', 'application/json');
  //when my client receives this Json string in the body of the reply message, it can go in and extract the token from there.
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', (req, res, next) => {
   if(req.session) {
     req.session.destroy();
     res.clearCookie('session-id');
     res.redirect('/');
   }
   else {
     var err= new Error('You are not logged in1');
     err.statusCode= 403;
     next(err);
   }
});

module.exports = router;
