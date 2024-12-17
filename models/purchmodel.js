const mongoose = require('mongoose');

const purchasedBooksSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  purchasedAt: {
    type: Date,
    default: Date.now
  }
});

const PurchasedBook = mongoose.model('PurchasedBook', purchasedBooksSchema);
module.exports = PurchasedBook;
