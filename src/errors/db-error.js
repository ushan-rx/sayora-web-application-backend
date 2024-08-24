import CustomAPIError from './custom-api.js';

class DBError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.name = 'DBError';
    }
}

export default DBError;
