import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import regularPatientSchema from '../../../validations/regularPatient/regularPatientValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createRegularPatient, getRegularPatients, deleteRegularPatient } from '../../../controllers/regularPatient.controller.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(regularPatientSchema), createRegularPatient)
    .get(sanitizeMiddleware, validate(regularPatientSchema), getRegularPatients);

router.route('/:id')
    .delete(sanitizeMiddleware, validate(regularPatientSchema), deleteRegularPatient);

export default router;
