const CustomAPIError = require('./custom-api');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const InternalServerError = require('./server-error');
const DBError = require('./db-error');

module.exports = {
    CustomAPIError,
    NotFoundError,
    BadRequestError,
    InternalServerError,
    DBError
}