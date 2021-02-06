const mongoose= require('mongoose');

var leaderSchema= new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    abbr : {
        type : String
    },
    description : {
        type : String
    },
    featured : {
        type : Boolean,
        required : true
    }
});

var leaders= mongoose.model('leaders', leaderSchema);
module.exports= leaders;