const Product = require("../models/product");
const AppError = require("../utils/AppError")

// GET /products            -> all products
// GET /products?category=casual -> filtered by category
exports.getProducts = async (req, res, next) => {
    try {
        const filter = {};

        // Filter by category if provided
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Pagination
        const limit = Number(req.query.limit) || 6;
        const page = Number(req.query.page) || 1;

        const skip = (page - 1) * limit;

        // Get products for current page
        const products = await Product
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total number of products matching the filter
        const totalProducts = await Product.countDocuments(filter);

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            products,
            totalProducts,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        const error = AppError(
            "something went wrong fetching data",
            500
        );

        next(error);
    }
};

exports.getTopSelling = async (req, res, next) => {
    try {
        const products = await Product.find()
            .sort({ soldCount: -1 })
            .limit(5);

        res.status(200).json(products);
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
        console.log("BODY:", req.body);
        console.log("SOLD COUNT:", req.body.soldCount);

        const product = await Product.create(req.body);

        console.log("CREATED PRODUCT:", product);

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