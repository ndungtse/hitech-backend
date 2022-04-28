const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "https://img.icons8.com/ios-glyphs/60/user--v1.png",
  },
  messages: {
    type: Array,
  },
  role: {
    type: String,
  },
  orders: {
    type: Array,
  },
  email: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  },
  counts: {
    type: Array,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
