const express = require("express");
const router = express.Router();
const Count = require('../models/countModel');

router.get('/', async (req, res)=>{
   try {
       const counts  = await Count.find()
       res.send(counts)
   } catch (error) {
       res.send("error ocurred")
   }
})

router.post('/', async (req, res)=>{
    const count = new Count({
        cart: req.body.cart,
        wish: req.body.wish,
        payment: req.body.payment
    })
    try {
        const savedCount = await count.save();
        res.json(savedCount);
    } catch (error) {
        res.send('error ocurred', error)
    }
})

router.get('/:id', async(req, res)=>{
    try {
        const count = await Count.findById(req.params.id)
        res.send(count)
    } catch (error) {
        res.send('error ocurred', error)
    }
})

router.delete('/:id', async(req, res)=>{
const id = req.params.id
Count.findByIdAndUpdate(id, {
    cart: req.params.cart,
    wish: req.params.wish,
    payment: req.params.payment
},  async(err, docs) => {
    if (err) {
      res.send(err);
    } else {
     const counts = await Count.find();
     let count = counts.find((pro)=> pro._id == id)
      res.send(count)
    }
})
})    

module.exports = router