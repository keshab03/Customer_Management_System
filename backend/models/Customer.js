const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  due: {
    type: Number,
    required: true,
  },
  extra: {
    type: Number,
    require: true,
  }
}, { timestamps: true });
const Customer = mongoose.model('CustomerDetails', customerSchema);
module.exports = Customer;