const express = require('express');
const router = express.Router()
const Product = require("../models/productModel");

router.get('/', async(req, res)=>{
    try {
        let arr = []
        const products = await Product.find()
        const cart = products.filter((c) => c.cart === true)
        if (Array.isArray(cart)) {
            res.status(200).send(cart)
        } else {
            arr.push(cart)
            res.status(200).send(arr)
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router