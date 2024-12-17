const mongoose =require('mongoose')

const wishlistschema=new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const wishlists =mongoose.model("wishlists",wishlistschema)
module.exports=wishlists

