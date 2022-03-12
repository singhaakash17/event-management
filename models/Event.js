const mongoose=require('mongoose')

const eventSchema=mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    event_duration:{
        type:Number
    },
    event_startTime:{
        type:Date
    },

    ended:{
        type:Boolean,
        default:false
    },
    

})

module.exports=mongoose.model('Event',eventSchema)