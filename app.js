const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const cors = require("cors");

app.use(bodyParser.json());

/* var whitelist = [
  "https://hitech1.herokuapp.com",
  "http://localhost:4040",
  "http://localhost:8080",
  "https://hitech1.vercel.app/",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions)); */

app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT"
}))

const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");

app.use("/products", postsRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend");
});


const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


