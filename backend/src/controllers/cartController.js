const Cart = require("../models/cart")

// module.exports
exports.getAllCartItems = async (req, res) => {
    try {
        const allCartItems = await Cart.find();
        res.status(200).json(allCartItems)
    } catch (err) {
        res.json(404).json({ msg: "couldn't return the cart items" })
    }
}

exports.updateCartItem = async (req, res) => {
    try {
        const updatedItem = await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updatedItem)
    } catch (err) {
        res.status(404).json({ msg: "couldn't return the updated cart item" })
    }
}

exports.deleteCartItem = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "cart item deleted successfuly"})
    } catch (error) {
        res.status(404).json({msg: "problem to delete cart item"})
    }
}