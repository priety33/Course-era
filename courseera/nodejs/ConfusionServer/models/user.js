var mongoose = require('mongoose');
var passportLocalMongoose= require('passport-local-mongoose');


var User = new mongoose.Schema ({
    firstname : {
        type : String,
        default : ''
    },
    lastname : {
        type : String,
        default : ''
    },
    admin : {
        type : Boolean,
        default : false
    }
});

//using passport local mongoose as plugin in our model and schema
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);