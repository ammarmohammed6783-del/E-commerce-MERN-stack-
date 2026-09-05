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

exports.addCartItem = async (req, res, next) => {
    try {
        const { product, variant, quantity } = req.body;

        let cart = await Cart.findOne({
            user: req.userId
        });

        // If user doesn't have a cart yet
        if (!cart) {
            cart = await Cart.create({
                user: req.userId,
                items: [
                    {
                        product,
                        variant,
                        quantity
                    }
                ]
            });
        } else {
            // User already has a cart
            cart.items.push({
                product,
                variant,
                quantity
            });

            await cart.save();
        }

        res.status(201).json({
            msg: "Cart item added successfully",
            cart
        });

    } catch (err) {
        next(AppError(
            "Something went wrong while adding the cart item",
            500
        ));
    }
};

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