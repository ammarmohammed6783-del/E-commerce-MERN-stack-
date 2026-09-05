const Product = require("../models/product");
const AppError = require("../utils/AppError")

// GET /products            -> all products
// GET /products?category=casual -> filtered by category
exports.getProducts = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        const error = AppError("something went wrong fetching data", 500)
        next(error)
    }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        const error = AppError("something went wrong fetching data", 500)
        next(error)
    }
};



// will be used by the admin
// POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }

        const { stars, review } = req.body;

        product.reviews.push({
            user: req.userId,
            stars,
            review
        });

        await product.save();

        res.status(201).json({
            message: "Review added successfully",
            review: {
                stars,
                review
            }
        });

    } catch (err) {
        next(err);
    }
};