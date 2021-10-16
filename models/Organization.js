const mongoose = require("mongoose");

const OrgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, 
  },
  mmc_code: {
    type: String,
    required: true,
  },
  mobile_no_of_secretary: {
    type: Number,
    required: true,
  },
  name_of_org: {
    type: String,
    required: true,
  },
  name_of_secretary: {
    type: String,
    required: true,
  },
  no_of_all_registration: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Organisation = mongoose.model("organisation", OrgSchema);
