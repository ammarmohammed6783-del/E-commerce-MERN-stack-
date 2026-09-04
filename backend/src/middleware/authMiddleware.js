const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                msg: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
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