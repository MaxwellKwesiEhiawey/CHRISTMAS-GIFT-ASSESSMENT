const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products-today', shopController.getTodayProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-reduce-quantity', isAuth, shopController.postReduceCartQuantity);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/order-delete-item', isAuth, shopController.postOrderDeleteProduct);


router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

// router.post('/order-delete-item', isAuth, shopController.postOrderDeleteProduct);

router.post('/checkout', isAuth, shopController.postCheckout);

router.get('/checkout', isAuth, shopController.getCheckout);

router.post('/payment', isAuth, shopController.postPayment);

router.get('/payment', isAuth, shopController.getPayment);

module.exports = router;
