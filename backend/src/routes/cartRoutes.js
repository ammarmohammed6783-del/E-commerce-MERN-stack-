const express = require("express")
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, cartController.getAllCartItems)
router.patch("/:id", authMiddleware, cartController.updateCartItem)
router.delete("/:id", authMiddleware, cartController.deleteCartItem)

module.exports = router;