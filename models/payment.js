const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      total: { type: Number, required: true },
    }
  ],
  user: {
    name: {
      type: String,
      required: false
    },
    // contact: {
    //   type: String,
    //   required: true
    // },
    // address: {
    //   type: String,
    //   required: true
    // },
    // country: {
    //   type: String,
    //   required: true
    // },
    // state: {
    //   type: String,
    //   required: true
    // },
    // city: {
    //   type: String,
    //   required: true
    // },
    // zip: {
    //   type: String,
    //   required: true
    // },
    // email: {
    //   type: String,
    //   required: true
    // },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Payment', paymentSchema);