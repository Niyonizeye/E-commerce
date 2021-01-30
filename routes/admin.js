const path = require('path');

const express = require('express');
const adminController = require('../controllers/adminController')

const router =express.Router(); 

// admin/add-prooduct => get
router.get('/add-product',adminController.getAddProduct);

router.get('/products',adminController.getProducts);

// admin/add-prooduct => post 
router.post('/add-product',adminController.postAddProducts); 

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);

module.exports = router;