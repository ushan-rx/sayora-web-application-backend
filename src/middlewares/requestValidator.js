const yup = require('yup');
const customError = require('../errors');

const validate = (schema) => async (req, res, next) => {
    const { body, query, param} = req;
    try {
        await schema.validate(body);
        await schema.validate(query);
        await schema.validate(param);
        
        next();
    } catch (error) {
        const validationError = new customError.BadRequestError('Invalid request data');
        validationError.stack = error.stack;
        next(validationError);
    }
}



module.exports = validate;