const PurchasedBook = require('../models/purchmodel');

// Add to Purchased Books
exports.addPurchasedController = async (req, res) => {
    console.log("inside add to purchase controller");
    
  const userId = req.userId; // Extract userId from JWT middleware
  const { productId, quantity } = req.body; // Get productId and optional quantity
console.log(userId,productId);

  if (!userId || !productId) {
    return res.status(400).json({ error: 'userId and productId are required' });
  }

  try {
    // Check if the product is already purchased
    const existingPurchase = await PurchasedBook.findOne({ userId, productId });
    if (existingPurchase) {
      return res.status(406).json('Product already purchased');
    }

    // Add new purchased book
    const newPurchase = new PurchasedBook({
      userId,
      productId,
      quantity: quantity || 1,
    });

    await newPurchase.save();
    res.status(200).json(newPurchase);
  } catch (err) {
    console.error("Error adding to purchased books:", err);
    res.status(500).json({ message: 'Failed to add to purchased books', error: err });
  }
};










// Get Purchased Books
exports.getPurchasedController = async (req, res) => {
  const userId = req.userId; // Extract userId from JWT middleware

  try {
    // Get all purchased books for the user
    const purchasedBooks = await PurchasedBook.find({ userId }).populate('productId');
    if (!purchasedBooks || purchasedBooks.length === 0) {
      return res.status(404).json({ message: 'No purchased books found' });
    }
    const validItems = purchasedBooks.filter(item => item.productId !== null);

    // Check if the resulting array is empty
    if (!validItems || validItems.length === 0) {
      return res.status(404).json({ message: 'Cart contains no valid items' });
    }
    res.status(200).json(purchasedBooks);
  } catch (err) {
    console.error("Error fetching purchased books:", err);
    res.status(500).json({ message: 'Failed to retrieve purchased books', error: err });
  }
};
