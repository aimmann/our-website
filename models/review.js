const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    reviewBody: {
        type:String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    score: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("Review" , reviewSchema);