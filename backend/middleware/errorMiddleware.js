const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.method} ${req.originalUrl}`);
    res.status(404);
    next(error); // Forward error to next middleware
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = 'Internal Server Error';

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found - Invalid ID';
        statusCode = 404;
    }

    res.status(statusCode).json({
        error: {
            message,
            details: process.env.NODE_ENV === 'production' ? null : err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        },
    });
};

export { notFound, errorHandler };
