import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import patientSchema from '../../../validations/patientValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createPatient, getPatient, getPatients, updatePatient, deletePatient } from '../../../controllers/patient.controller.js';
import methodNotAllowed from '../../../middlewares/invalidRouteHandler.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(patientSchema), createPatient)
    .get(sanitizeMiddleware, validate(patientSchema), getPatients)
    .all(methodNotAllowed()); // 'v1/patient/'

router.route('/:id')
    .get(sanitizeMiddleware, validate(patientSchema), getPatient) // 'v1/patient/PAT00001'
    .put(sanitizeMiddleware, validate(patientSchema), updatePatient)
    .delete(sanitizeMiddleware, validate(patientSchema), deletePatient)
    .all(methodNotAllowed());

export default router;
