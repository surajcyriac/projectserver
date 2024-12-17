// controllers/wishlistController.js
const  Wishlist = require('../models/wishlistmodel');
const products = require('../models/productmodel'); // Assuming your Product model is here

exports.addwishlistController = async (req, res) => {
    console.log('Inside addwishlistController');
    const userId = req.userId; // Ensure this is being populated
    console.log(req.userId);
    
    const { productId } = req.body; // Ensure productId is in the request body

    console.log('userId:', userId);
    console.log('productId:', productId);

    if (!userId || !productId) {
        return res.status(400).json({ error: 'userId and productId are required' });
    }

    try {
        const existingwishlist = await  Wishlist.findOne({ userId, productId });
        if (existingwishlist) {
            return res.status(406).json('Product already wishlisted');
        }
        const newwishlist = new  Wishlist({ userId, productId });
        await newwishlist.save();
        res.status(200).json(newwishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
   }
};


// // Get user's wishlist
exports.getWishlistController = async (req, res) => {
    const userId = req.userId; // Getting userId from JWT middleware
    try {
        const wishlist = await Wishlist.find({ userId }).populate('productId');
        
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist is empty' });
        }
      // Filter out items with a null productId
    const validItems = wishlist.filter(item => item.productId !== null);

    // Check if the resulting array is empty
    if (!validItems || validItems.length === 0) {
      return res.status(404).json({ message: 'Cart contains no valid items' });
    }

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve wishlist', error: err });
    }
};


// Controller to delete a product from the wishlist
exports.deleteWishlistItem = async (req, res) => {
        const userId = req.userId; // Getting userId from JWT middleware

  const {  productId } = req.body;
console.log(userId,productId);

  if (!userId || !productId) {
    return res.status(400).json({ message: "User ID and Product ID are required." });
  }

  try {
    // Find and delete the wishlist item
    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });

    if (!deletedItem) {
      return res.status(404).json({ message: "Wishlist item not found." });
    }

    return res.status(200).json({ message: "Wishlist item deleted successfully." });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


