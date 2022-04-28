const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
// const fileUpload = multer();
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");

const cors = require("cors");

app.use(bodyParser.json());

app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT"
}))

const postsRoutes = require("./routes/products");
const userRoutes = require("./routes/userRoutes");

app.use("/products", postsRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to hitech-backend!!!");
});


// app.post("/upload", fileUpload.single("image"), function (req, res, next) {
//   let streamUpload = (req) => {
//     return new Promise((resolve, reject) => {
//       let stream = cloudinary.uploader.upload_stream((error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });

//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });
//   };

//   async function upload(req) {
//     let result = await streamUpload(req);
//     console.log(result);
//   }

//   upload(req);
// });

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


