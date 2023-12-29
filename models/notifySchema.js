const mongoose = require('mongoose')
const notifySchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"unavailable"]
    },
    password:{
        type:String,
        required:[true,"unavailable"]
    }
},
    {
        timestamps:true
    }
)
const notifyModel = mongoose.model('notifyAppLogin',notifySchema)
module.exports = notifyModel