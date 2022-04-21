const express = require('express');
const router = express.Router();
const Product = require('../models/productModel')
// const upload = require('../middlewares/upload')

router.get('/', async (req, res) => {
  try{
    const products = await Product.find();
    res.send(products)
  }catch (error){
    res.json({ message: "error occured"})
  }
})

router.post("/", async (req, res) => {
  const {name, category, price, image, owner, description } = req.body;
  const newProduct = new Product({name, category, price,image, owner, description })
  
  try{
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  }catch (error){
    res.status(409).json({ message: error.message });
  }

});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.put('/:id', async(req, res)=>{
  const id = req.params.id;
  Product.findByIdAndUpdate(id, { 
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    wish: req.body.wish,
    cart: req.body.cart,
    quantity: req.body.quantity
   }, async(err, docs) => {
    if (err) {
      res.send(err);
    } else {
     const products = await Product.find();
     let product = products.find((pro)=> pro._id == id)
      res.send(product)
    }
  });

  router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    Product.findByIdAndRemove(id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted : ", docs);
      }
    });
  })

})

module.exports = router;