const bcrypt = require('bcryptjs');
const Product = require('../models/product');
const User = require('../models/user');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    category: category,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      // console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.postDeleteOrder = (req, res, next) => {
  const ordersId = req.body.orderId;
  Product.findByIdAndRemove(orderId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/orders');
    })
    .catch(err => console.log(err));
};
exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.render('admin/users', {
        users: users,
        pageTitle: 'Users',
        path: '/admin/users'
      });
    })
    .catch(err => console.log(err));
};


exports.postUserUpdate = (req, res, next) => {
  const {email,status,password,confirmPassword} = req.body;
  if(password === confirmPassword){
    bcrypt.hash(password, 9)
  .then(hashPassword=>{
    console.log(hashPassword)
    User.updateOne({ email: email }, {status:status, password:hashPassword}, function(err, docs){
      if (err){ 
        console.log(err) 
        req.flash('error', 'An error occurred. Please try again.');
        return res.redirect('/admin/users');
    }
     return res.redirect('/admin/users')
    
    } )
  })
    .catch(err => {
      console.log('An error occurred. Please try again')
      req.flash('error', 'An error occurred. Please try again');
      return res.redirect('/admin/users');
    });
  }
  else{
    console.log('Password mismatch')
    req.flash('error', 'Password mismatch');
    return res.redirect('/admin/users');
  }
};

exports.getUserUpdate = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('admin/users', {
    users: users,
    pageTitle: 'Users',
    path: '/admin/users'
  });
};


exports.getAddUserUpdate = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('admin/add-user', {
    pageTitle: 'Add User',
    path: '/admin/add-user'
  });
};

exports.addUsers = (req, res, next) => {
      res.render('admin/add-user', {
        pageTitle: 'Add User',
        path: '/admin/add-user'
      });
   
   
};

exports.postAddUserUpdate = (req, res, next) => {
  const {email,status,password,confirmPassword} = req.body;
  if(password === confirmPassword){
    bcrypt.hash(password, 9)
  .then(hashPassword=>{
    console.log(hashPassword)
    User.updateOne({ email: email }, {status:status, password:hashPassword}, function(err, docs){
      if (err){ 
        console.log(err) 
        req.flash('error', 'An error occurred. Please try again.');
        return res.redirect('/admin/add-user');
    }
     return res.redirect('/admin/add-user')
    
    } )
  })
    .catch(err => {
      console.log('An error occurred. Please try again')
      req.flash('error', 'An error occurred. Please try again');
      return res.redirect('/admin/add-user');
    });
  }
  else{
    console.log('Password mismatch')
    req.flash('error', 'Password mismatch');
    return res.redirect('/admin/add-user');
  }
};

exports.getCreateCoupon = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('admin/create-coupon', {
    pageTitle: 'Add User',
    path: '/admin/create-coupon'
  });
};

// exports.postAddUserUpdate = (req, res, next) => {
//   const {date,amount,couponId,confirmCouponId} = req.body;
//   if(couponId === confirmCouponId){
//     bcrypt.hash(couponId, 9)
//   .then(CouponId=>{
//     console.log(hashCouponId)
//     User.updateOne({ date: date }, {couponId:couponId, password:hashPassword}, function(err, docs){
//       if (err){ 
//         console.log(err) 
//         req.flash('error', 'An error occurred. Please try again.');
//         return res.redirect('/admin/add-user');
//     }
//      return res.redirect('/admin/add-user')
    
//     } )
//   })
//     .catch(err => {
//       console.log('An error occurred. Please try again')
//       req.flash('error', 'An error occurred. Please try again');
//       return res.redirect('/admin/add-user');
//     });
//   }
//   else{
//     console.log('Password mismatch')
//     req.flash('error', 'Password mismatch');
//     return res.redirect('/admin/add-user');
//   }
// };