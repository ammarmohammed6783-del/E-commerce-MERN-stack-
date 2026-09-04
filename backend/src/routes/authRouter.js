const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const authController = require("../controllers/authController")

// The auth middleware is the piece of code that checks whether the request comes from a logged-in/authenticated user.
router.get("/me", authMiddleware, authController.getMe)
router.post("/register", authMiddleware, authController.register)
router.post("/signin", authMiddleware, authController.signin)

module.exports = router;