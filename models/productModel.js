const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema([
    {
        cartcount: {
            type: Number
        },
        wishcount: {
            type: Number
        }
    },
    {
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    cart: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: 'https://icon-library.com/images/icon-for-product/icon-for-product-23.jpg'
    },
    wish: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }    
}]);

module.exports = mongoose.model('Product', ProductSchema);


