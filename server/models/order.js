const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {type: String, require: true},
  customerId: {type: String},
  paymentIntentId: {type: String},
  products: [{
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String},
    brand: {type: String},
    desc:{type: String},
    price: {type: String},
    image: {type: String},
    cartQuantity: {type: Number},
    exp_year: {type: Number},
    funding: {type: String},
    last4: {type: Number},
    name: {type: String},
  }],
    subtotal: {type: Number, required: true},
    total: {type: Number, required: true},
    shipping: {type: Object, required: true},
    delivery_status: {type: String, default: "pending"},
    patment_status: {type: String, required: true},
}, 
    {timestamps: true}
 )

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;