const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    reviewBody: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review