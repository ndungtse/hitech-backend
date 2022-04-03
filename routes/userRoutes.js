const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const countRoutes = require("./counts");
router.use("/counts", countRoutes);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
module.exports = router;
