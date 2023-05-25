const express = require("express");
const { UserModel } = require("../models/UserModel");
const registerRouter=express.Router()
const bcrypt = require('bcrypt');

registerRouter.get("/",(req,res)=>{
    res.send("welcome to register route")
})

registerRouter.post("/add-user",async (req,res)=>{

    let {name,email,password}=req.body
    const isUser = await UserModel.findOne({email})

    if(isUser){
        res.send({"msg" : "User already exists"})
    }
    else {
        bcrypt.hash(password, 4, async function(err, hash) {
        if(err){
            res.send({"msg":"Something went wrong please try again"})
        }
        const new_user=new UserModel({
            name,
            email,
            password:hash,
        })
        try{
            await new_user.save()
            res.send({"msg" : "User Register Successfully"})
        }
        catch(err){
            console.log(err)
            res.send({"msg" : "Something went wrong please try again"})
        }
    });

}
})

module.exports={registerRouter}