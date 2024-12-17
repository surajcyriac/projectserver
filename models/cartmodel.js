

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
