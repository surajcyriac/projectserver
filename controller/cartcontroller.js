const Cart = require('../models/cartmodel');
const products = require('../models/productmodel'); // Assuming your Product model is here

exports.addCartController = async (req, res) => {
  const userId = req.userId; // Extract userId from JWT middleware
  const { productId, quantity } = req.body; // Get productId and optional quantity

  if (!userId || !productId) {
    return res.status(400).json({ error: 'userId and productId are required' });
  }

  try {
    // Check if product is already in the cart
    const existingCartItem = await Cart.findOne({ userId , productId });
    if (existingCartItem) {
      return res.status(406).json('Product already in cart');
    }

    // Add new cart item
    const newCartItem = new Cart({ userId, productId, quantity: quantity || 1 });
    await newCartItem.save();
    res.status(200).json(newCartItem);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: 'Failed to add to cart', error: err });
  }
};

exports.getCartController = async (req, res) => {
  const userId = req.userId; // Extract userId from JWT middleware

  try {
    // Get all cart items for the user
    const cartItems = await Cart.find({ userId }).populate('productId');

    // Filter out items with a null productId
    const validCartItems = cartItems.filter(item => item.productId !== null);

    // Check if the resulting array is empty
    if (!validCartItems || validCartItems.length === 0) {
      return res.status(404).json({ message: 'Cart contains no valid items' });
    }

    console.log(validCartItems);
    res.status(200).json(validCartItems);

  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: 'Failed to retrieve cart', error: err });
  }
};













  exports.deleteCartItem = async (req, res) => {
    const userId = req.userId; // Extract userId from JWT middleware
    const { productId } = req.body; // Get productId from request body
  
    if (!userId || !productId) {
      return res.status(400).json({ message: 'User ID and Product ID are required.' });
    }
  
    try {
      // Find and delete the cart item
      const deletedItem = await Cart.findOneAndDelete({ userId, productId });
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Cart item not found.' });
      }
  
      res.status(200).json({ message: 'Cart item deleted successfully.' });
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  
//   update quantity

exports.updateCartQuantity = async (req, res) => {
    const userId = req.userId; // Extracted from JWT middleware
    const { productId, quantity } = req.body;

    console.log('Update Quantity Request:', { userId, productId, quantity });

    if (!userId || !productId || quantity === undefined) {
        return res.status(400).json({ message: "User ID, Product ID, and Quantity are required." });
    }

    if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    try {
        // Find the cart item and update the quantity
        const cartItem = await Cart.findOneAndUpdate(
            { userId, productId },
            { $set: { quantity } },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found." });
        }

        return res.status(200).json({ message: "Cart quantity updated successfully.", cartItem });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
