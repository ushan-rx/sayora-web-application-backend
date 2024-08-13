const CustomAPIError = require('./custom-api');

class DBError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.name = 'DBError';
    }
}

module.exports = DBError;