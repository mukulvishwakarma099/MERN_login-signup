const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  token: { type: String },
});

const UserModel = mongoose.model("UserModal", userSchema);

module.exports = UserModel;
