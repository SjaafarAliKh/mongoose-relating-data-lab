const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    size: {
        type: Number,
        min: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',      // must match the model name in User.js
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // must match the model name in Category.js
        required: true
    }
}, { timestamps: true })

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing