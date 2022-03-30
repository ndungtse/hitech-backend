const mongoose = require('mongoose');

const countSchema = mongoose.Schema({
    cart: {
        type: Number,
        default: 0
    },
    wish: {
        type: Number,
        default: 0
    },
    payment: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Counts', countSchema)