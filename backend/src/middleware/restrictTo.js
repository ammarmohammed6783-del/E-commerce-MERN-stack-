const User = require("../models/user")
const AppError = require("../utils/AppError")

const restrictTo = (...roles) => {
    return async (req, res, next) => {

        const user = await User.findById(req.userId);

        if (!roles.includes(user.role)) {
            const error = new AppError("Not authorized", 403)
            return next(error);
        }

        next();
    };
};

module.exports = restrictTo;