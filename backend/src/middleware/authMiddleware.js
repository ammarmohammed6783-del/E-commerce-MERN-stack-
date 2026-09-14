const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;

        if (!accessToken) {
            return res.status(401).json({
                msg: "No access token provided",
            });
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({
            msg: "Invalid or expired access token",
        });
    }
};

module.exports = authMiddleware;