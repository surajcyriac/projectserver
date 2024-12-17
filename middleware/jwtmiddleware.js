const jwt=require('jsonwebtoken')

const jwtmiddleware=(req,res,next)=>{
console.log("inside middleware");

const token =req.headers['authorization'].split(" ")[1]
console.log(token);
if(token!==""){try{

    const jwtresponse= jwt.verify(token,process.env.JWTPASSWORD)
    console.log(jwtresponse);
   const userId=jwtresponse.userId
   req.userId=userId
    next()
}catch(err){
    res.status(401).json("authorisation failed .no valid token found")

}
}else{
    res.status(404).json("authorisation failed .no valid token found")
}
}
module.exports=jwtmiddleware