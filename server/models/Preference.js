const mongoose=require('mongoose')
const User=require('./User')
const preferenceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    availableDays:{
        type:Object,
    },
    guests:{
        type:Number,
    },
    preferredGender:{
        type:String,
        enum:['male','female','both'],
        default:'both',
    },
    multipleRequests:{
        type:Boolean,
        default:false,
    },

})

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;