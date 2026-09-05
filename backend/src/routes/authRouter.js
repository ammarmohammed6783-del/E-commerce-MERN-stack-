const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const authController = require("../controllers/authController")

const validate = require("../middleware/validate");
const { signupSchema, signinSchema } = require("../schemas/authSchema");

// The auth middleware is the piece of code that checks whether the request comes from a logged-in/authenticated user.
router.get("/me", authMiddleware, authController.getMe)
router.post( "/signup", validate(signupSchema), authController.signup );
router.post( "/signin", validate(signinSchema), authController.signin );

module.exports = router;