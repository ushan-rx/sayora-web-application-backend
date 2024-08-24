import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import prescriptionSchema from '../../../validations/prescriptionValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createPrescription, getPrescription, getPrescriptions, updatePrescription, deletePrescription } from '../../../controllers/prescription.controller.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(prescriptionSchema), createPrescription)
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescriptions);

router.route('/:id')
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescription)
    .put(sanitizeMiddleware, validate(prescriptionSchema), updatePrescription)
    .delete(sanitizeMiddleware, validate(prescriptionSchema), deletePrescription);

export default router;
