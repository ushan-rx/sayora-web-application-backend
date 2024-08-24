import ENVIROMENT from '../config/env.config.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error details for debugging
    console.error(`[${new Date().toISOString()}] ${err.name}: ${message} \n ${err.stack}`);

    // Send a structured error response
    res.status(statusCode).json({
        success: false,
        error: {
            name: err.name,
            message: message,
            stack: ENVIROMENT.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

export default errorHandler;
