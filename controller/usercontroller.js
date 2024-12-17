const e = require('express');
const users=require('../models/usermodel');
const jwt =require('jsonwebtoken')


exports.registerController=async (req,res)=>{
    console.log("inside user register");
console.log(req.body);
const {username,email,password}=req.body
try{
 const existinguser=await users.findOne({email})
if(existinguser){
    res.status(406).json("user already registered.. please Login")

}else{
const newuser =new users({
    username,email,password
})
await newuser.save()
res.status(200).json(newuser)

}

}catch(err){
    console.log(err);
    res.status(401).json(err)
    

}
}


exports.loginController = async(req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // token geneartion
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json("Incorrect Email / Password!!")
        }
    } catch (err) {
        console.log(err);
        
        res.status(401).json(err)
    }   
}

// profile updation
exports.edituserController=async(req,res)=>{
    console.log("inside edit user controller");
    console.log(req.body);
    const user_Id = req.userId
    const {username,email,password,userimg} = req.body
    const Uploaduserimg = req.file?req.file.filename:userimg

    try{
        const updateduser =await users.findByIdAndUpdate({_id:user_Id},{
            username,email,password,userimg:Uploaduserimg
        },{new:true})
      
            await updateduser.save()
            res.status(200).json(updateduser)
        
    }catch(err){
        console.log(err);
        res.status(401).json(err)
 }

}

