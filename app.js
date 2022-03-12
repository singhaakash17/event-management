const express=require("express");
const cors=require('cors')
const mongoose=require('mongoose')
const urlRoute=require('./routes/urlRoute')
require('dotenv').config()
const url=process.env.DATABASE_URL
const app=express()

try {
    
    mongoose.connect(url,{useNewUrlParser:true})
    const con=mongoose.connection
    con.on('open',()=>{
        console.log("Connected to Database")
    })    
} catch (error) {
    console.log(error)
}

//app.use(cors())
app.use(express.json())
app.use('/',urlRoute)
//app.use('/',redirectRoute)
app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>')
})
app.listen(3000,()=>{
    console.log("App running on 3000")
})