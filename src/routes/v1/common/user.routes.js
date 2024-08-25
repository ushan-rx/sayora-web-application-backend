import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import userSchema from '../../../validations/userValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../../../controllers/user.controller.js';
import methodNotAllowed from '../../../middlewares/invalidRouteHandler.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(userSchema), createUser)
    .get(sanitizeMiddleware, validate(userSchema), getUsers)
    .all(methodNotAllowed());

router.route('/:id')
    .get(sanitizeMiddleware, validate(userSchema), getUser)
    .put(sanitizeMiddleware, validate(userSchema), updateUser)
    .delete(sanitizeMiddleware, validate(userSchema), deleteUser)
    .all(methodNotAllowed());

export default router;
