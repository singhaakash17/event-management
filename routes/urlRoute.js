const express=require("express");
const Event=require('../models/Event')
const route=express.Router()

setInterval(async()=>{
    console.log("Checking")
    const events=await Event.find({ended:false});
    events.forEach(async event=>{
        
        if(Date.now()>=new Date(event.event_startTime.getTime()+event.event_duration*60*60*1000))
                {
                console.log(event)
                await Event.findByIdAndDelete(event._id)    
                console.log("Changed")    
                }
            })
},10000)
route.get('/upcoming-event',async (req,res)=>{
    try{
        const events=await Event.find({ended:false});
        res.json(events)
    }
    catch(e)
    {
        res.send(e)
    }
    

})

route.get('/live-events',async (req,res)=>{
    try{
        const events=await Event.find({ended:false});
        var live_events=[]
        events.forEach(event => {
            
        var minutes=(Math. abs(Date.now() - event.event_startTime) / (36e5))*60
        console.log(minutes)
        if(minutes<=10)
            live_events.push(event)
        });
        res.send(live_events)
    }
    catch(e)
    {
        res.send(e)
    }
    

})

route.post('/event',async(req,res)=>{
       const event=new Event({
                eventName:req.body.eventName,
                event_startTime:req.body.startTime,
                event_duration:req.body.duration,
                ended:false
            });
            event.save()
            res.send({
                statusCode:201,
                data:event
            })
                    
        
    
})
module.exports=route;
