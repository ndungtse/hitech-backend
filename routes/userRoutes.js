const express = require('express');
const router = express.Router()
const User = require('../models/userModel');

router.get('/', async(req, res) => {
    // try {
    //     const users = await User.find()
    //     res.send(users)
    // } catch (error) {
    //     res.status.send('error ocurred')
    // }
    res.send("user route");
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
        res.send('error ocurred', error)
    }
})
module.exports = router