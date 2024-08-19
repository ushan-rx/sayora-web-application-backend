const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/requestValidator');
const regularPatientSchema = require('../../../validations/regularPatient/regularPatientValidation');
const sanitizeMiddleware = require('../../../middlewares/requestSanitizer');

const { createRegularPatient, 
        getRegularPatients, 
        deleteRegularPatient } = require('../../../controllers/regularPatient.controller');

router.route('/')
    .post(sanitizeMiddleware, validate(regularPatientSchema), createRegularPatient)
    .get(sanitizeMiddleware, validate(regularPatientSchema), getRegularPatients);

router.route('/:id')
    .delete(sanitizeMiddleware, validate(regularPatientSchema), deleteRegularPatient);

module.exports = router;
