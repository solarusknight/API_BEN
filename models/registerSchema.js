const mongoose = require('mongoose')
const regSchema = mongoose.Schema(
    {
        Name:{
            type:String,
            required:[true,"This field is required"]
        },
        phoneNumber:{
            type:Number,
            required:[true,"This field is required"]
        },
        email:{
            type:String,
            required:[true,"This field is required"]
        },
        Message:{
            type:String,
            required:[true,"This field is required"]
        }
    },
    {
        timestamps:true
    }
)
const regModel = mongoose.model('regModel',regSchema)
module.exports = regModel