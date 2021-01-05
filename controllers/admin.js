const bcrypt = require('bcryptjs');
const Product = require('../models/product');
const User = require('../models/user');
const Coupon = require('../models/coupon');

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

exports.postAddUser = (req, res, next) => {
  const {name,email,usertype,userid,department,status,password,confirmPassword} = req.body;
  if(password === confirmPassword){
    bcrypt.hash(password, 9)
  .then(hashPassword=>{
    const user = new User({
      name: name,
      email: email,
      usertype: usertype,
      userid: userid,
      department:department,
      password:hashPassword,
      status:status,
      cart: { items: [] }
    });
    user.save()
  .then(result => {
    res.redirect('/admin/users');
  });
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

exports.postCoupon = (req, res, next) => {
  const {vfrom,vto,percent,numgen} = req.body;
  try{
  var date = formatDate();
    for(var i=1; i<= Number(numgen); i++){ 
    var random = randomString(10);
    const coupon = new Coupon({
      name:random,
        vfrom: vfrom,
        vto: vto,
        percent: percent,
        status:'unused',
        date:date
      });
      coupon.save()
    }

    return res.redirect('/admin/coupons');
    }catch(err){
      req.flash('error', 'An error occurred.');
    return res.redirect('/admin/coupons');
    }
    
};

exports.getCoupons = (req, res, next) => {
  Coupon.find()
    .then(coupons => {
      res.render('admin/coupons', {
        coupons: coupons,
        pageTitle: 'Coupons',
        path: '/admin/coupons'
      });
    })
    .catch(err => console.log(err));
};

function randomString(length) {
			
  var text = "";

  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for(var i = 0; i < length; i++) {
  
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  
  }
  
  return text;
}

function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

