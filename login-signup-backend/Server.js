const express = require("express");
const app = express();
const cors = require("cors");
const model = require("./user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/UserCollectionDB");

app.post("/api/register", async (req, res) => {
  // creating hash password using bcrypt.js
  const newPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await model.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      phone: req.body.phone,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  // console.log(req.body.email);
  const email = req.body.email;
  const password = req.body.password;

  const user = await model.findOne({ email: email });
  const isPasswordValid = bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // creating a token using jwt
    const token = await jwt.sign(
      { email: user.email, name: user.name },
      "secret123"
    );

    res.json({ status: "ok", token: token });
  } else {
    res.json({ status: "wrong email or password" });
  }
});

app.listen("9002", () => {
  console.log("server started");
});
