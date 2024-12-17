const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  pro_id:{
    type: String,
    required: true,
    unique:true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
 },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
  },
  // price: {
  //   type:Number,
  //   required:true
  // },
  productimg:{
    type:String,
    required:true
},
user_Id:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true,
    default:"Pending"
  },
  link:{
    type:String,
    required:true,
  },
comments: [],
// 
});

const products = mongoose.model('products', productSchema);

module.exports = products;
