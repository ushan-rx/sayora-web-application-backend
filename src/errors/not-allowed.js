import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class MethodNotAllowedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.METHOD_NOT_ALLOWED;
    }
}

export default MethodNotAllowedError;
