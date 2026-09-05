const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorMiddleware;

/*

Why is this useful?

Without a global handler, you might repeat this in every controller:

catch (error) {
    res.status(500).json({
        message: error.message
    });
}

when to use it?
    with unexpected errors
*/