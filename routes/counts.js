const express = require("express");
const mongoose = require('mongoose')

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
router.get('/:id', async (req, res)=>{
   try {
       const counts  = await Count.find(req.params.id)
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

router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const {cart, wish, payment}= req.body
    const updatedCount = {cart, wish, payment, _id:id };
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
await Count.findByIdAndUpdate(id, updatedCount, { new: true })
    // await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedCount);
})    

module.exports = router