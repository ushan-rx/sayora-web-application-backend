import CustomError from '../errors/index.js';


const validate = (schema) => async (req, res, next) => {
    const { body, query, params } = req; // Fixed typo: changed 'param' to 'params'
    try {
        await schema.validate(body);
        await schema.validate(query);
        await schema.validate(params);

        next();
    } catch (error) {
        const validationError = new CustomError.BadRequestError('Invalid request data');
        validationError.stack = error.stack;
        next(validationError);
    }
}

export default validate;
