const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
  try {
    let arr = [];
    const products = await Product.find();
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
