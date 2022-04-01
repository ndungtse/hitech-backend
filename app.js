const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const timeout = require("connect-timeout");

require("dotenv/config");

const cors = require("cors");

app.use(timeout("60s"));
app.use(haltOnTimedout);
app.use(bodyParser.json());
app.use(cors({
  origin: "*",
})
);

// eslint-disable-next-line require-jsdoc
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");
const countRoutes = require("./routes/counts");

app.use("/products", postsRoutes);
app.use("/user", userRoutes);
app.use("/counts", countRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend");
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () =>
  console.log("connected to DB")
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

