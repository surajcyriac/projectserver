const products = require('../models/productmodel')

// add project
exports.addProductController = async (req,res)=>{
    console.log("inside addProductController");
    const userId = req.userId
    console.log("userId",req.userId);
    const {pro_id,title,author,genre,description,language,publisher,user_Id,comments,link} = req.body
    const productimg = req.file.filename
    console.log(pro_id,title,author,genre,description,language,publisher,productimg,user_Id,comments,link);
    try{
        const existingProduct =await products.findOne({pro_id})
        if(existingProduct){
            res.status(406).json("Product already exist in our collection... Please upload another!! ")
        }else{
            const newProduct = new products({
                pro_id,title,author,genre,description,language,publisher,productimg,user_Id,comments,link  
                      })
            await newProduct.save()
            res.status(200).json(newProduct)
        }
    }catch(err){
        console.log(err);
        
        res.status(401).json(err)
    }

    
}


// get user products. needs authorisation
exports.userProductController=async(req,res)=>{
    console.log('inside userProductController ');
    const user_Id=req.userId
    console.log(user_Id);
    
    try{
      const allUserProducts =await products.find({user_Id})
      res.status(200).json(allUserProducts)
      console.log(allUserProducts);
      
    }catch(err){
        res.status(401).json(err)        
    }
    
}


// edit project needs authorisation
exports.editProjectController = async (req,res)=>{
    console.log("inside editProjectController");
    const id = req.params.id
    const user_Id = req.userId
    const {title,author,genre,description,language,publisher,productimg,link} = req.body
    const reUploadproductimg = req.file?req.file.filename:productimg
    try{
        const updateProduct =await products.findByIdAndUpdate({_id:id},{
            title,author,genre,description,language,publisher,productimg:reUploadproductimg,user_Id,link
        },{new:true})
      
            await updateProduct.save()
            res.status(200).json(updateProduct)
        
    }catch(err){
        console.log(err);
        
        res.status(401).json(err)
 }

}




exports.showallproductsController = async (req,res)=>{
    console.log("inside allProjectController");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        title:{
            $regex:searchKey,$options:'i'
        }
    }
    try {
        const allUserPrducts = await products.find(query)
         // Filter out items with a null productId
    const validproducts = allUserPrducts.filter(item => item.status == "Approved");

        res.status(200).json(validproducts)
    } catch (err) {
        res.status(401).json(err)
    }
}



exports.singleproductcontroller = async (req,res)=>{
    const id = req.params.id
    console.log("inside singleproductcontroller");
    // const searchKey = req.query.search
    // console.log(searchKey);
    // const query = {
    //     title:{
    //         $regex:searchKey,$options:'i'
    //     }
    // }
    try {
        const singlePrduct = await products.findById({_id:id})
        res.status(200).json(singlePrduct)
    } catch (err) {
        res.status(401).json(err)
    }
}



    exports.removeproductController = async (req,res)=>{
        console.log("remove product Controller");
        const id = req.params.id
        try {
            const deleteproduct = await products.findByIdAndDelete({_id:id})
        } catch (err) {
            res.status(401).json(err)
    }
    }




// ----------------admin----------------------

exports.adminproductsController = async (req,res)=>{
    console.log("inside admin product Controller");
    try {
        const allUserPrducts = await products.find()
        res.status(200).json(allUserPrducts)
    } catch (err) {
        res.status(401).json(err)
    }
}




// book status update 
exports.statusController = async (req,res)=>{
    console.log("inside statusController");
    // get recipe id from url parameter
    const {bookId} = req.params
    // get status of recipe from url query
    const status = req.query.status
    // update status of recipe with given id
    console.log(bookId,status);
    
    try{
        const existingBook = await products.findById({_id:bookId})
        existingBook.status = status
        await existingBook.save()
        res.status(200).json(existingBook)
    }catch(err){
        console.log(err);
        
        res.status(401).json(err)
    }  
}


// adding comments

// Controller to add comments to a product
exports.addCommentController = async (req, res) => {
    console.log("Inside addCommentController");
      const { bookId } = req.params;
      const { username,comments } = req.body;
  
    try {
          const existingProduct = await products.findById(bookId);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found." });
      }
      existingProduct.comments.push({ username, comments });
        await existingProduct.save();
      res.status(200).json({ message: "Comment added successfully.", product: existingProduct });
    } catch (err) {
      console.error("Error adding comment:", err);
      res.status(500).json({ message: "Internal server error.", error: err });
    }
  };
  