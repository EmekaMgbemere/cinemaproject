const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: Number,
  email: String,
  password: String,
  userType: String,
  cinemaAdmin:String,
  secretKey: String,
  companyId: String,
  theaterID: String,
  selectedlocation: String,
  companyAddress: String,
  avatar: String,
  counterid: String,
  countername:String,
  adminID:String,
  CinemaFromAdminId:String,
  comingsoonID:String,  
  selectedOption:String,  
  numImages:Number,  
  selectedusers:String, 
  cinemaName:String, 
  seatnumber:Number
});

const User = mongoose.model('User', userSchema);
module.exports = User;