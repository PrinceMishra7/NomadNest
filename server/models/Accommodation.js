const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    sleepingArrangements:{
        type:String,
    },
    descriptionOfPlace:{
        type:String,
    },
    publicTransportAccess:{
        type:String,
    },
    pictures:{
        type:Array,
    },

})