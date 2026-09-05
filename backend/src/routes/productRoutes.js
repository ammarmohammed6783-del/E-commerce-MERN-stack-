const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware")
const restrictTo = require("../middleware/restrictTo")

const validate = require("../middleware/validate");
const {
    createProductSchema,
    updateProductSchema,
    reviewSchema
} = require("../schemas/productSchema");


router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProductById);

// used by admin
router.post(
    "/",
    authMiddleware,
    restrictTo("admin"),
    validate(createProductSchema),
    productController.createProduct
);


router.put(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    validate(updateProductSchema),
    productController.updateProduct
);

router.post(
    "/:id/review",
    authMiddleware,
    validate(reviewSchema),
    productController.createReview
)

module.exports = router;