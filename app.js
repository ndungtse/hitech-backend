const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const verify = require('./middlewares/verToken')

const cors = require("cors");

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT",
  })
);

app.get('/auth', verify, (req, res)=>{
  res.json({message: 'you are authenticated'})
})

const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");
const order = require("./routes/order");

app.use("/products", postsRoutes);
app.use("/user", userRoutes);
app.use("/orders", order);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend!!!");
});

const PORT = process.env.PORT || 8080;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
