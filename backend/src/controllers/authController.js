const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError")

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email }); // you can't find by password bec its already hashed in the register

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid email or password"
            });
        }

        // 3. Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // 4. Send token
        res.status(200).json({
            msg: "Signed in successfully",
            token
        });

    } catch (err) {
        const error = new AppError("Something went wrong while signing in", 500)
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const userId = req.userId;

        const loggedInUser = await User.findById(userId);
        if (!loggedInUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            msg: "found the user",
            loggedInUser
        })
    } catch (err) {
        const error = new AppError("Something went wrong while getting the user", 500);
        next(error)
    }
}



exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                msg: "User already exists"
            });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const user = await User.create({
            email,
            password: hashedPassword
        });

        // 4. Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "7d" }
        );

        // 5. Send response
        res.status(201).json({
            msg: "Signed up successfully",
            token
        });

    } catch (err) {
        console.error(err);

        const error = new AppError("something went wrong on registeration", 500)
        next(error)
    }
};

/*
    sign: to create a token
    verifing: to ensure a token is valid and untampered
    decoding: If you only need to inspect the token without verifying it, This returns an object containing the header, payload, and signature 
        const decoded = jwt.decode(token, { complete: true });
*/