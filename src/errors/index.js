import CustomAPIError from './custom-api.js';
import NotFoundError from './not-found.js';
import BadRequestError from './bad-request.js';
import InternalServerError from './server-error.js';
import DBError from './db-error.js';
import MethodNotAllowedError from './not-allowed.js';

const CustomError = {
    CustomAPIError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
    DBError,
    MethodNotAllowedError
};

export default CustomError;
