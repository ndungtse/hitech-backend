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

router.get('/:id', asyn