const express = require("express")
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware")

const validate = require("../middleware/validate");
const { updateCartSchemaItem, addToCartSchema } = require("../schemas/cartSchema")

router.get("/", authMiddleware, cartController.getAllCartItems)
router.post("/", authMiddleware, validate(addToCartSchema), cartController.addCartItem)
router.patch("/:id", authMiddleware, validate(updateCartSchemaItem), cartController.updateCartItem)
router.delete("/:id", authMiddleware, cartController.deleteCartItem)

module.exports = router;