const express=require("express")
const { UserModel } = require("../models/UserModel")
const userProfile=express.Router()
const jwt=require("jsonwebtoken")


userProfile.get("/",async(req,res)=>{
    const profile=await UserModel.find()
    res.send({"profile":profile})
})

userProfile.post("/update/:token",async(req,res)=>{
    const {token}=req.params
    const decode=jwt.decode(token,"ABCD12345XYZ")
    // const profile=await UserModel.findOne({_id:decode.user_detail.user_id})
    const {dob,gender,mobile,age}=req.body

    try{
        const updated= await UserModel.findByIdAndUpdate({_id:decode.user_detail.user_id},{"$set":{"dob":dob,"gender":gender,"mobile":mobile,"age":age}})
        res.send({"msg":"update successfully"})
     }
     catch(err){
         console.log(err)
         res.send({"msg":"update not successfully"})
     }
})

userProfile.get("/user/:token",async(req,res)=>{
    const {token}=req.params
    const decode=jwt.decode(token,"ABCD12345XYZ")
    const profile=await UserModel.findOne({_id:decode.user_detail.user_id})
    res.send({"data":profile})
})


module.exports={userProfile}