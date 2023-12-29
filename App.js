const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const regSchema = require('./models/registerSchema')
const notifyAppLogin = require('./models/notifySchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
mongoose.connect("mongodb+srv://solarisknight:wolf@cluster0.fjloxgx.mongodb.net/Portfolio?retryWrites=true&w=majority")
// mongoose.connect("mongodb://localhost:27017/20MER121")
.then(()=>{
    console.log("connected to the mongoDB Servers")
})
.catch((error)=>{
    console.log("Something went wrong.")
})
const App = express()
App.use(cors())
App.listen(process.env.PORT,()=>{
    console.log("Node App running")
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
        //console.log(inputData)
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
        console.log("Couldn't Store datas into the servers")
    }
})
//get method to fetch datas from the server
App.get("/get",async(req,res)=>{
    try {
        const fetchedData = await regSchema.find()
        res.status(200).json(fetchedData)
        //console.log(fetchedData)
    } catch (error) {
        res.status(400).json({message:"Couldn't fetch datas from the server"})
        console.log("Couldn't fetch datas from the server")
    }
})
App.post('/createuser',async(req,res)=>{
    const {username} = req.body
    const {password} = req.body
    const hashed_password = await bcrypt.hash(password,10)
    try{
        const data = await notifyAppLogin.create({"username":username,"password":hashed_password})
        res.status(200).json(data)
    }
    catch(err){
        console.log("Something went wrong")
        res.status(500).json({"Message":"Something went wrong"})
    }
})
//Login JWT
App.post("/generateToken",async(req,res)=>{
    const {username} = req.body
    const {password} = req.body
    try{
        const obj = await notifyAppLogin.find({"username":username})
        if(obj.length > 1){
            return res.json({message:"Something went wrong!"})
            // return res.status(404).send("Something went wrong")
        }
        else if(obj.length <1){
            // return res.status(404).json({message:"User not found"})
             return res.json({message:"User not found"})
        }
        var Password_Server
        obj.map((o)=>{
            Password_Server = o.password
        })
        const password_verify = await bcrypt.compare(password,Password_Server)
        var token
        if(password_verify){
            const secret = process.env.SECRET_KEY
            token = jwt.sign(username,secret)
            return res.json({token:token})
        }
        else{
            return res.json({message:"Invalid password"})
        }
    }
    catch(e){
        // res.status(404).json({message:"Something went wrong"})
        res.json({message:"Something went wrong"})
    }
})
//get loginData JWT
App.get("/getToken",(req,res)=>{
    const Header = process.env.HEADER_NAME
    const secret = process.env.SECRET_KEY
    try{
        const token = req.header(Header)
        if(token){
            const data = jwt.verify(token,secret)
            // console.log(data)
            res.send(data)
        }
        else{
            res.send("Invalid token")
        }
    }
    catch(err){
        console.log(err)
    }
})
