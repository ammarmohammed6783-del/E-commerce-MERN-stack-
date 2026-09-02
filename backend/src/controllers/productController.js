const Product = require("../models/product");

// GET /api/products            -> all products
// GET /api/products?category=casual -> filtered by category
exports.getProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// will be used by the admin
// POST /api/products
// exports.createProduct = async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(201).json(product);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// PUT /api/products/:id
// exports.updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });
//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }
//         res.json(product);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// DELETE /api/products/:id
// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }
//         res.json({ message: "Product deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };