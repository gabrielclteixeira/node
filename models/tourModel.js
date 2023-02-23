// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tours must have names!'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Tours must have durations!'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Tours must have a max group size!'],
    },
    difficulty: {
        type: String,
        required: [true, 'Tours must have difficulty!'],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Tours must have prices!']
    },
    priceDiscount: Number,
    summary: {
       type: String,
       trim: true
    },
    description: {
        type: String,
        required: [true, 'A tour must have a description!'],
        trim: true
     },
     imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image!'],
     },
     images: {
        type: [String],
     },
     createdAt: {
        type: Date,
        default: Date.now(),
        select: false
     },
     startDates: {
        type: [Date],
     }
    
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
