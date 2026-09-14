const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};

const accessTokenCookieOptions = {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 minutes
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password",
            });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid email or password",
            });
        }

        // 3. Create access token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // 4. Create refresh token
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Store both tokens in HTTP-only cookies
        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        // 6. Send response
        res.status(200).json({
            msg: "Signed in successfully",
        });
    } catch (err) {
        const error = new AppError(
            "Something went wrong while signing in",
            500
        );

        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, userName } = req.body;

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                msg: "User already exists",
            });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

        // 4. Create access token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // 5. Create refresh token
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // 6. Store both tokens in HTTP-only cookies
        res.cookie(
            "accessToken",
            accessToken,
            accessTokenCookieOptions
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        );

        // 7. Send response
        res.status(201).json({
            msg: "Signed up successfully",
        });
    } catch (err) {
        const error = new AppError(
            "Something went wrong on registration",
            500
        );

        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const userId = req.userId;

        const loggedInUser = await User.findById(userId).select(
            "-password"
        );

        if (!loggedInUser) {
            return res.status(404).json({
                msg: "User not found",
            });
        }

        res.status(200).json({
            msg: "Found the user",
            loggedInUser,
        });
    } catch (err) {
        const error = new AppError(
            "Something went wrong while getting the user",
            500
        );

        next(error);
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({
                msg: "Refresh token is required",
            });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // Create new access token
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // Replace old access token cookie
        res.cookie(
            "accessToken",
            newAccessToken,
            accessTokenCookieOptions
        );

        res.status(200).json({
            msg: "Access token refreshed successfully",
        });
    } catch (err) {
        const error = new AppError(
            "Invalid or expired refresh token",
            401
        );

        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        // Remove access token
        res.clearCookie(
            "accessToken",
            cookieOptions
        );

        // Remove refresh token
        res.clearCookie(
            "refreshToken",
            cookieOptions
        );

        res.status(200).json({
            msg: "Logged out successfully",
        });
    } catch (err) {
        next(err);
    }
};

/*
    sign:
    Creates a JWT.

    verify:
    Verifies that the JWT is valid and has not been tampered with.

    decode:
    Only reads the JWT payload without verifying it.

    Example:

    const decoded = jwt.decode(token, {
        complete: true
    });
*/