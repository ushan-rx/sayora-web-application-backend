import CustomError from '../errors/index.js';

const methodNotAllowed = () => (req, res, next) => {
    console.log('Method not allowed middleware');
    const error = new CustomError.MethodNotAllowedError(`Method ${req.method} is not allowed on this route`);
    next(error);  // Pass the error to the next middleware
};

export default methodNotAllowed;

