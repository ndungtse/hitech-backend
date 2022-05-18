const express = require('express');
const router = express.Router()
const verify = require('../middlewares/verToken')
const Order = require('../models/orderModel')

router.post("/newOrder", verify, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/',async(req, res)=>{
  try {
    const orders = await Order.find()
    res.status(200).send(orders)
  } catch (error) {
    res.status(500).json(error);
  }
})
router.get('/:id',async(req, res)=>{
  const id = req.params.id
  try {
    const orders = await Order.find({_id: id})
    res.status(200).send(orders)
  } catch (error) {
    res.status(500).json(error);
  }
})

/* 
router.put("/:id", verifyAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
*/
router.get("/find/:userId", verify, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router