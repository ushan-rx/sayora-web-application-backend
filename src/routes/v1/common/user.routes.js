import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import userSchema from '../../../validations/userValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../../../controllers/user.controller.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(userSchema), createUser)
    .get(sanitizeMiddleware, validate(userSchema), getUsers);

router.route('/:id')
    .get(sanitizeMiddleware, validate(userSchema), getUser)
    .put(sanitizeMiddleware, validate(userSchema), updateUser)
    .delete(sanitizeMiddleware, validate(userSchema), deleteUser);

export default router;
