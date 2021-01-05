const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.post('/add-user', isAuth, adminController.postAddUser);

router.get('/users', isAuth, adminController.getUsers);

router.post('/coupon', isAuth, adminController.postCoupon);

router.get('/coupons', isAuth, adminController.getCoupons);

router.get('/user-update', isAuth, adminController.getUserUpdate);

router.post('/user-update', isAuth, adminController.postUserUpdate);

module.exports = router;
