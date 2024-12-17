const express = require('express')
const usercontroller =  require('../controller/usercontroller')
const productcontroller =require('../controller/productcontroller')
const jwtmiddleware = require('../middleware/jwtmiddleware')
const multerMiddleware = require('../middleware/multermiddleware')
const wishlistcontroller= require('../controller/wishlistcontroller')
const cartcontroller =  require('../controller/cartcontroller')
const purchasController =  require('../controller/purchasecontroller')


const router =new express.Router()
// register
router.post('/register',usercontroller.registerController)
// login
router.post('/login',usercontroller.loginController)
// edit user + applying middleware  path= localhost-3000/edit-user
router.put('/edit-user',jwtmiddleware,multerMiddleware.single('userimg'),usercontroller.edituserController)

// add books + applying middleware
router.post('/add-product',jwtmiddleware,multerMiddleware.single('productimg'),productcontroller.addProductController)
// alluserbooks : /all-books
router.get('/user-products',jwtmiddleware,productcontroller.userProductController)
// edit project + applying middleware  path= localhost-3000/project/id/edit
router.put(`/products/:id/edit`,jwtmiddleware,multerMiddleware.single('productimg'),productcontroller.editProjectController)
// allUserproject : /all-project
router.get('/all-product',jwtmiddleware,productcontroller.showallproductsController) 
// single rproject : /single-project
router.get('/product/:id/item',jwtmiddleware,productcontroller.singleproductcontroller) 
// remove product : /projects/id/remove
router.delete('/product/:id/remove',jwtmiddleware,productcontroller.removeproductController)
// add to wishlist
// router.post('/add-wishlist',jwtmiddleware, wishlistcontroller.addToWishlistController)
// Add to bookmarks: http://localhost:3000/add-bookmark
router.post('/add-wishlist', jwtmiddleware, wishlistcontroller.addwishlistController);

// Get user wishlist: http://localhost:3000/bookmarks
router.get('/get-wishlist', jwtmiddleware, wishlistcontroller.getWishlistController);

// Remove bookmark: http://localhost:3000/bookmark/:id/remove
router.delete('/del-wishlist', jwtmiddleware, wishlistcontroller.deleteWishlistItem);

// addto cart
// router.post('/add-tocart',jwtmiddleware,cartcontroller.addtocartcontroller)

// Add to cart
router.post('/add-cart', jwtmiddleware, cartcontroller.addCartController);

// Get user cart
router.get('/get-cart', jwtmiddleware, cartcontroller.getCartController);

// Remove from cart
router.delete('/del-cart', jwtmiddleware, cartcontroller.deleteCartItem);

// update quantity
router.put('/update-cart', jwtmiddleware, cartcontroller.updateCartQuantity);
// Add to purchased books
router.post('/add-purchased', jwtmiddleware, purchasController.addPurchasedController);

// // Get user's purchased books
router.get('/get-purchased', jwtmiddleware, purchasController.getPurchasedController);

// admin product cotroller
router.get('/admin-product',jwtmiddleware,productcontroller.adminproductsController) 
// admin product cotroller
// router.put("/products/:bookId/status",jwtmiddleware,productcontroller.statusController) 
// update book status
router.get("/products/:bookId/status",jwtmiddleware,productcontroller.statusController)
// add commets
router.post("/product/:bookId/comments",jwtmiddleware,productcontroller.addCommentController)

module.exports = router