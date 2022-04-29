const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logvalidation, regvalidation, updateValidation } = require("../valids/validation");
const verify = require("../middlewares/verToken");

const countRoutes = require("./counts");
router.use("/counts", countRoutes);

const cartRoute = require("./oncart");
router.use("/cart", cartRoute);

const wishRoute = require("./onwish");
router.use("/wish", wishRoute);

router.get("/", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { error } = regvalidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const emailExist = await User.findOne({ email: req.body.email });
    const usernameExist = await User.findOne({ username: req.body.username });

    if (emailExist) return res.status(400).send("Email already exists");
    if (usernameExist)
      return res.status(400).send("Person with this username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // console.log(req.body.password);

    const { username, email } = req.body;
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { error } = logvalidation(req.body);
  if (error) {
    res.send(error.details[0].message);
  } else {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(400).send("No user found");

    console.log(req.body.password);

    if (!user) {
      return res.send("invalid Password");
    } else {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (!validPass) return res.status(400).send("Invalid password");

      const token = jwt.sign(
        { _id: user._id, name: user.username },
        process.env.LOG_TOKEN
      );
      // res.header("Access-Control-Allow-Origin", "*");
      res.cookie("auth-token", token).send(token);
    }
  }
});

router.put("/:id", verify, async (req, res) => {
  const id = req.params.id;
  const { error } = updateValidation(req.body);
  if (error) {
    res.send(error.details[0].message);
  } else {
    const { username, email, password, picture, role } = req.body;
    User.findByIdAndUpdate(id, {
      username,
      email,
      password,
      picture,
      role,
    }, async (err, docs)=>{
      if (err) {
      res.send(err);
    } else {
     const users = await User.find();
     const user = users.find((use)=> use._id == id)
      res.send(user);
    }
    });
  }
});

module.exports = router;
