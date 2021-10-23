const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({err, msg: err.message, status: err.status});
}

module.exports = errorHandlerMiddleware;