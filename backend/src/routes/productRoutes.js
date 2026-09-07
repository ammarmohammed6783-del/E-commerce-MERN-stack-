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


router.get("/", productController.getProducts); // remove authMiddleware bec i can show them to anyone even if he is not logged in
router.get("/top-selling", productController.getTopSelling);
router.get("/:id", authMiddleware, productController.getProductById);

// used by admin
router.post(
    "/",
    authMiddleware,
    restrictTo("admin"),
    validate(createProductSchema),
    productController.createProduct
);


router.patch(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    validate(updateProductSchema),
    productController.updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    restrictTo("admin"),
    productController.deleteProduct
);


router.post(
    "/review/:id",
    authMiddleware,
    validate(reviewSchema),
    productController.createReview
)

module.exports = router;