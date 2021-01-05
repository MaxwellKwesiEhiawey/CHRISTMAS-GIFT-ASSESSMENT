const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  vfrom: {
    type: String,
    required: true
  },
  vto: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  status:{
    type:String
  },
  date:{
    type:String,
    required: true
  }
});

module.exports = mongoose.model('Coupon', couponSchema);


