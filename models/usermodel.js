const mongoose =require('mongoose')

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userimg:{
        type:String,
        default:"deaultuser.jpg"
    },
    role:{
        type:String,
        required:true,
        default:"User"
    }
})
const users =mongoose.model("users",userschema)
module.exports=users


