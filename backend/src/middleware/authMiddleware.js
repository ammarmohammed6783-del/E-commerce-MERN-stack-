const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: "No token provided"
            });
        }

        const accessToken = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.userId = decoded.userId; // It's simply copying the user ID from the verified JWT payload into req.userId.

        next();

    } catch (err) {
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
};

module.exports = authMiddleware;