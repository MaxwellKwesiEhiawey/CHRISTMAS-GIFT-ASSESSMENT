const Product = require('../models/product');
const Order = require('../models/order');
const Checkout = require('../models/checkout');
const Payment = require('../models/payment');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      // console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getTodayProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      // console.log(products);
      res.render('shop/product-for-today', {
        prods: products,
        pageTitle: 'Products for today',
        path: '/products-today'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Amalitech Cafeteria',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postReduceCartQuantity = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.reduceCartQuantity(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('order.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.order.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.postOrderDeleteProduct = (req, res, next) => {
  const ordersId = req.body.orderId;
  req.user
    .removeFromOrder(ordersId)
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.postCheckout = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const checkout = new Checkout({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return checkout.save();
    })
    .then(() => {
      res.redirect('/checkout');
    })
    .catch(err => {
      console.log(err);});
};

exports.getCheckout = (req, res, next) => {
  req.user
     .populate('cart.items.productId')
     .execPopulate()
     .then(user => {
       const products = user.cart.items;
       res.render('shop/checkout', {
         path: '/checkout',
         pageTitle: 'Checkout',
         products: products
       });
     })
     .catch(err => console.log(err));
 };

exports.postPayment = (req, res, next) => {
  const {name, contact, address, country, state,city, zip, total} = req.body;
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { product: { ...i.productId._doc }, total: total };
      });
      const payment = new Payment({
        user: {
          email: req.user.email,
          userId: req.user,
          // name: name,
          // contact: contact,
          // address: address,
          // country: country,
          // state: state,
          // city: city,
          // zip: zip
        },
        products: products
      });
      return payment.save();
    })
    .then(() => {
      res.redirect('/payment');
    })
    .catch(err => console.log(err));
};

exports.getPayment = (req, res, next) => {
  Payment.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/payment', {
        path: '/payment',
        pageTitle: 'Payment',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

