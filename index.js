require('dotenv').config();
const express = require('express')
const cors =  require('cors')
const router =require('./routes/router')
const taskServer= express()
require ('./database/dbConnection')

taskServer.use(cors())
taskServer.use(express.json())
taskServer.use(router)
// folder globlisation
taskServer.use('/uploads',express.static('./uploads'))

const PORT=3000|| process.env.PORT

taskServer.listen(PORT,()=>{
    console.log('test server startede at port 3000');
    
})

taskServer.get('/',(req,res)=>{
   res.status(200).send("<h1> test server started <h1/>") 
})