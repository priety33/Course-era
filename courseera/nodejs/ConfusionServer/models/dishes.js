const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); //new currency type added to mongoose
const Currency= mongoose.Types.Currency;

const commentSchema= new Schema ({
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    comment : {
        type : String,
        required : true
    },
    author : {
        //author field will simply store a reference to the ID of the user document, instead of storing the details about the author in the form of a name
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {
    timestamp : true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    label : {
        type : String,
        default : ''
    },
    price : {
        type : Currency,
        required : true,
        min : 0
    },
    featured : {
        type : Boolean,
        default : false
    },
    comments : [ commentSchema ]
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;