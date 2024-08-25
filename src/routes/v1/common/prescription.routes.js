import express from 'express';
import validate from '../../../middlewares/requestValidator.js';
import prescriptionSchema from '../../../validations/prescriptionValidation.js';
import sanitizeMiddleware from '../../../middlewares/requestSanitizer.js';
import { createPrescription, getPrescription, getPrescriptions, updatePrescription, deletePrescription } from '../../../controllers/prescription.controller.js';
import methodNotAllowed from '../../../middlewares/invalidRouteHandler.js';

const router = express.Router();

router.route('/')
    .post(sanitizeMiddleware, validate(prescriptionSchema), createPrescription)
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescriptions)
    .all(methodNotAllowed());

router.route('/:id')
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescription)
    .put(sanitizeMiddleware, validate(prescriptionSchema), updatePrescription)
    .delete(sanitizeMiddleware, validate(prescriptionSchema), deletePrescription)
    .all(methodNotAllowed());

export default router;
