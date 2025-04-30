const mongoose = require("mongoose")

const coffeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        default:"",
        required: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ["Single Origin", "Organic", "Premium Blends"],
        required: true
    },
    slug: {
        type: String,
        unique: false,
        required: false
    },
    bestSeller: {
        type: Boolean,
        default: false,
    },
}, 
{ timestamps: true });

const CoffeeModel = mongoose.model("coffees", coffeeSchema)
module.exports = CoffeeModel 