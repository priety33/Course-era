const mongoose= require('mongoose');
require('mongoose-currency').loadType(mongoose); //new currency type added to mongoose
const Currency= mongoose.Types.Currency;

var Promoschema= new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    label : {
        type : String ,
        default : ''
    },
    price : {
        type : Currency,
        min : 0,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        default : false
    }
});

var Promos= mongoose.model('promotions', Promoschema);

module.exports= Promos;