const express = require("express");
const router = express.Router();
const User = require('../models/userModel')

router.get("/:id", async (req, res) => {
  const id=req.params.id;
  try {
    let arr = [];
    const user = await User.findById(id);
    const products = await user.products
    const wish = products.filter((c) => c.wish === true);

    if (Array.isArray(wish)) {
      res.status(200).send(wish);
    } else {
      arr.push(wish);
      res.status(200).send(arr);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
