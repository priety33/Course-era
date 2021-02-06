//use this file to store authentication startegies
var passport= require('passport');
//exporting strategy to use in our app
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy; //This will provide us with a JSON Web Token based strategy for configuring our passport module
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');


//mongoose plugin itself adds this function called user.authenticate. So it adds this method to the user schema and the model
passport.use(new LocalStrategy(User.authenticate()));
//These two functions - serialize user and deserialize user are provided on the user schema and model by the use of the passport-local-mongoose plugin
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creates a jwt
exports.getToken = function(user) {
    //parameters => payload, secret key
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600}); //how many sec jwt will be valid
};

var opts = {}; //options that ill specify for my jwt strategy
//this option specifies how the jsonwebtoken should be extracted from the incoming request message.
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 
//this is the second parameter which helps me to supply the secret key which I'm going to be using within my strategy for the sign-in
opts.secretOrKey = config.secretKey;

//specifying the JWT based strategy
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => { //verifying function
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

    //any place that I want to verify the user, I can simply call upon this verifyUser function that I have specified here or the export that I've specified here, which we'll call upon the passport.authenticate using the JWT strategy to authenticate the user
exports.verifyUser = passport.authenticate('jwt', {session: false}); //passport will use jwt startegy, and we dont use sessions in token based startegy