const path = require('path');

const express = require('express');
const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/is-auth');

const router =express.Router(); 

// admin/add-prooduct => get
router.get('/add-product',isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

// // admin/add-prooduct => post 
router.post('/add-product', isAuth, adminController.postAddProducts); 

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;