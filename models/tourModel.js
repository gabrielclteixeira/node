// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tours must have names!'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'Tours must have prices!']
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
