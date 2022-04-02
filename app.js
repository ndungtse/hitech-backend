const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const cors = require("cors");

app.use(bodyParser.json());
app.use(cors({
  origin: "*",
})
);


const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");

app.use("/products", postsRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend");
});

// mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true}, () =>
//   console.log("connected to DB")
// );
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

