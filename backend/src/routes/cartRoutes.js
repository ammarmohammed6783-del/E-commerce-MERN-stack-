const express = require("express")
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware")

const validate = require("../middleware/validate");
const addToCartSchema = require("../schemas/cartSchema")

router.get("/", authMiddleware, cartController.getAllCartItems)
router.patch("/:id", authMiddleware, validate(addToCartSchema), cartController.updateCartItem)
router.delete("/:id", authMiddleware, cartController.deleteCartItem)

module.exports = router;