const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const regSchema = require('./models/registerSchema')
mongoose.connect("mongodb+srv://solarisknight:wolf@cluster0.fjloxgx.mongodb.net/Portfolio?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to the mongoDB Servers")
})
.catch((error)=>{
    console.log("Something went wrong.")
})
const App = express()
App.use(cors())
App.listen(3001,()=>{
    console.log("Node App running on port 3001")
});
//getting server response
App.get("/",(req,res)=>{
    // res.send("Welcome to Node.js")
    res.sendFile(path.join(__dirname,'/views/index.html'));
});
App.use(express.json())
//post method for user details
App.post("/register", async(req,res)=>{
    try {
        const inputData = await regSchema.create(req.body)
        res.status(200).json(inputData)
        console.log(inputData)
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log("Couldn't Store datas into the servers")
    }
})
//get method to fetch datas from the server
// App.get("/login",async(req,res)=>{
//     try {
//         const fetchedData = await regSchema.find()
//         res.status(200).json(fetchedData)
//         console.log(fetchedData)
//     } catch (error) {
//         res.status(400).json({message:"Couldn't fetch datas from the server"})
//         console.log("Couldn't fetch datas from the server")
//     }
// })

App.post("/login",async(req,res)=>{
    try {
        const EnteredUname = req.body.username;
        const EnteredPassword = req.body.password;
        const User = await regSchema.findOne({username:EnteredUname})
        EnteredUname===User.username && EnteredPassword===User.password ? res.status(200).json({respond:"Approve"}) : res.status(400).json({respond:"Prevent"})
    } catch (error) {
        console.log("Node Error")
    }
})