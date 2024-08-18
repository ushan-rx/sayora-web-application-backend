const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator');
const prescriptionSchema = require('../../../validations/prescriptionValidation');
const sanitizeMiddleware  = require('../../../middlewares/requestSanitizer');

const {
    createPrescription,
    getPrescription,
    getPrescriptions,
    updatePrescription,
    deletePrescription
} = require('../../../controllers/prescription.controller');

router.route('/')
    .post(sanitizeMiddleware, validate(prescriptionSchema), createPrescription)
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescriptions);

router.route('/:id')
    .get(sanitizeMiddleware, validate(prescriptionSchema), getPrescription)
    .put(sanitizeMiddleware, validate(prescriptionSchema), updatePrescription)
    .delete(sanitizeMiddleware, validate(prescriptionSchema), deletePrescription);

module.exports = router;
