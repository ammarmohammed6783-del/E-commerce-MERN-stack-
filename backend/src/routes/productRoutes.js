const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware")
const restrictTo = require("../middleware/restrictTo")

router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProductById);

// used by admin
router.post("/", restrictTo("admin"), authMiddleware, productController.createProduct);
router.put("/:id", restrictTo("admin"), authMiddleware, productController.updateProduct);
router.delete("/:id", restrictTo("admin"), authMiddleware, productController.deleteProduct);

module.exports = router;