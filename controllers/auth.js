const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
     const isUserValid = !user;
      if (isUserValid) {
        req.flash('error', 'Invalid email or User does not exist.');
        return res.redirect('/login');
      }
      
      if(user.status === 'pending'){
        req.flash('error', 'Account approval pending. Contact system administrator');
        return res.redirect('/login');
      }
      else if(user.status === 'suspended'){
        req.flash('error', 'Account suspended. Contact system administrator');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          
          req.flash('error', 'Invalid password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const {name,email,usertype,userid,department} = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'E-Mail exists already, please pick a different one.');
        return res.redirect('/signup');
      }
        const user = new User({
          name: name,
          email: email,
          usertype: usertype,
          userid: userid,
          department:department,
          password:"",
          status:'pending',
          cart: { items: [] }
        });
        user.save()
      .then(result => {
        res.redirect('/login');
      });
    })
    .catch(err => {
      req.flash('error', 'An error occurred. Please try again');
      return res.redirect('/signup');
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.send('logout successfull!');
  });
};
