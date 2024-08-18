const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator');
const userSchema = require('../../../validations/userValidation');
const sanitizeMiddleware = require('../../../middlewares/requestSanitizer');

const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../../../controllers/user.controller');

router.route('/')
    .post(sanitizeMiddleware, validate(userSchema), createUser)
    .get(sanitizeMiddleware, validate(userSchema), getUsers);

router.route('/:id')
    .get(sanitizeMiddleware, validate(userSchema), getUser)
    .put(sanitizeMiddleware, validate(userSchema), updateUser)
    .delete(sanitizeMiddleware, validate(userSchema), deleteUser);

module.exports = router;
