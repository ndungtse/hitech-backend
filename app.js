const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors({
  origin: "*",
})
)

const postsRoutes = require('./routes/products')
const userRoutes = require('./routes/userRoutes')
const countRoutes = require('./routes/counts')

app.use('/products', postsRoutes);
app.use('/user', userRoutes)
app.use('/counts', countRoutes);

app.get('/', (req, res) => {
    res.send('Hi')
})

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, () =>
  console.log("connected to DB")
);

const PORT = process.env.PORT  || 8080;

app.listen(PORT, () => {console.log(`server is running on port ${PORT}`);
})

