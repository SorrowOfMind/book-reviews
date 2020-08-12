const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;