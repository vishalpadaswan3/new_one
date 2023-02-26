const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {type : String,required:true},
    email : {type : String,required:true},
    mobileNo : {type : String,required:true},
    gender : {type : String,required:true},
    password : {type : String,required:true}
})

const userModel = mongoose.model("loginData",userSchema)


module.exports = {
    userModel
}