const mongoose = require("mongoose");
const User = require('./User');


const FlutterSchema = new mongoose.Schema({
  transaction_id: {type: String},
  amount: {type: Number},
  tx_ref: {type: Number},
  created_at: {type: Date},
  customer:{
      email:{type: String},
      name:{type: String},
      phone_number:{type: Number},
      },
      created_at: {type: Date},
      UserId: {type: String}
     } )

const Flutter = mongoose.model('Flutter', FlutterSchema)

module.exports = Flutter;
