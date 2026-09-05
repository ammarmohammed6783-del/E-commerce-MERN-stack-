const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError")

exports.getAdmins = (req, res, next) => {

}

exports.createAdmin = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const admin = await User.create({
            userName,
            email,
            password: hashedPassword,
            role: "admin"
        });

        res.status(201).json({
            msg: "Admin created successfully",
            admin
        });

    } catch (err) {
        next(err);
    }
};

exports.deleteAdmin = (req, res, next) => {

}

exports.patchAdmin = (req, res, next) => {

}