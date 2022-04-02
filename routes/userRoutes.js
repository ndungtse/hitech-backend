const express = require('express');
const router = express.Router()
const User = require('../models/userModel');


const countRoutes = require("./counts");
router.use('/counts', countRoutes)

router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status.send('error ocurred')
    }
})

router.post('/', async(req, res)=>{
  
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.passowrd
    });
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.status(500).send('error ocurred')
    }
})
module.exports = router