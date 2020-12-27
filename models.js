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

const Agency = mongoose.model("agency", agencySchema);

module.exports = {
  Agency,
};
