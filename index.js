const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Product = require('./models/productModel')

require("dotenv/config");

const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
})
);



// const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");
const countRoutes = require("./routes/counts");

// app.use("/products", postsRoutes);
app.use("/user", userRoutes);
app.use("/counts", countRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend 2");
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () =>
  console.log("connected to DB")
);
console.log("Database_URL", process.env.DB_CONNECTION);

//products route
app.get('/products', async (req, res) => {
    try{
      const products = await Product.find();
      res.send(products)
    }catch (error){
      res.json({ message: "error occured"})
    }
  })
  app.post("/products", async (req, res) => {
    const product = new Product({
      cartcount: req.body.cartcount,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
    });
    try{
      const savedProduct = await product.save();
      res.json(savedProduct);
    }catch (error){
      res.json({ message: "error occured" });
    }
  
  });
  
  app.get("/products/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (err) {
      res.send("Error " + err);
    }
  });
  
  app.put('/products/:id', async(req, res)=>{
    const id = req.params.id;
    Product.findByIdAndUpdate(id, { 
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      wish: req.body.wish,
      cart: req.body.cart
     }, async(err, docs) => {
      if (err) {
        res.send(err);
      } else {
       const products = await Product.find();
       let product = products.find((pro)=> pro._id == id)
        res.send(product)
      }
      
    });
  
    app.delete('/products/:id', (req, res)=>{
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


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

