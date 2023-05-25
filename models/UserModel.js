const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    dob:{type:String,required:false},
    gender:{type:String,required:false},
    mobile:{type:Number,required:false},
    age:{type:Number,required:false},
})

const UserModel=mongoose.model("user",userSchema)


module.exports={UserModel}