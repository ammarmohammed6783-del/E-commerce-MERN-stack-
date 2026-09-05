const Cart = require("../models/cart")
const AppError = require("../utils/AppError")

// module.exports
exports.getAllCartItems = async (req, res, next) => {
    try {
        const allCartItems = await Cart.find();
        res.status(200).json(allCartItems)
    } catch (err) {
        const error = AppError("something went wrong fetching data", 500)
        next(error)
    }
}

exports.updateCartItem = async (req, res, next) => {
    try {
        const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updatedItem)
    } catch (err) {
        const error = AppError("something went wrong fetching data", 500)
        next(error)
    }
}

exports.deleteCartItem = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "cart item deleted successfuly" })
    } catch (err) {
        const error = AppError("something went wrong fetching data", 500)
        next(error)
    }
}