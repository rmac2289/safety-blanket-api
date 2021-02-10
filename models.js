const mongoose = require("mongoose");
const { Schema } = mongoose;

const agencySchema = new Schema({
  agency: String,
  phone: String,
  street: String,
  state: String,
  city: String,
  zip: Number,
});
const userSchema = new Schema({
  userId: String,
  favorites: Array,
});

const Agency = mongoose.model("agency", agencySchema);
const User = mongoose.model("user", userSchema);
module.exports = {
  Agency,
  User,
};
