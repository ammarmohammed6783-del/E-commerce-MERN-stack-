const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    review: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});


const variantSchema = new Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    }
});

const productSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        itemDesc: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            enum: ["all", "casual", "formal", "gym", "party"]
        },
        variants: [variantSchema],
        reviews: [reviewSchema],
        soldCount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;